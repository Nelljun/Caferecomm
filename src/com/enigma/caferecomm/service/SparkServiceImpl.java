package com.enigma.caferecomm.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.spark.ml.recommendation.ALS;
import org.apache.spark.ml.recommendation.ALSModel;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SaveMode;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.catalyst.expressions.GenericRowWithSchema;
import org.apache.spark.storage.StorageLevel;

import com.enigma.caferecomm.dao.ReviewEmotionsDAO;
import com.enigma.caferecomm.vo.PredictRating;
import com.enigma.caferecomm.vo.ReviewEmotion;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;


public class SparkServiceImpl implements SparkService{

	private static int no = 1;
	private SparkSession sparkSession;
	
	private static String ngrams = "";
	
	private static double positive ;
	private static double negative ;
	private static double complex ;
	private static double neutral ;
	private static double none ;
	private static int count ;
	
	private ReviewEmotionsDAO reviewEmotionsDAO;
	public void setSparkSession(SparkSession sparkSession) {
		this.sparkSession = sparkSession;
	}
	public void setReviewEmotionsDAO(ReviewEmotionsDAO reviewEmotionsDAO) {
		this.reviewEmotionsDAO = reviewEmotionsDAO;
	}
	@Override
	public void getCafeRating() {
		
		sparkSession = SparkSession.builder().appName("CafeRecomm").master("local[*]").getOrCreate();

		long start = System.currentTimeMillis();
		
		//rating 데이터프레임 생성
		Dataset<Row> rating = sparkSession.read().format("jdbc").option("dbtable", "\"RATINGS\"")
				.option("driver", "oracle.jdbc.OracleDriver")
				.option("url", "jdbc:oracle:thin:@localhost:1521:xe")
				.option("user", "caferecomm")
				.option("password", "1111")
				.option("header", "true").option("inferSchema", "true").load().persist(StorageLevel.MEMORY_ONLY());
		
		
		//als 모델 생성
		ALS als = new ALS().setMaxIter(10).setRegParam(0.01).setItemCol("CAFE_NO").setUserCol("USER_NO")
				.setRatingCol("RATING");
		ALSModel model = als.fit(rating);

		//각 유저에게 10개의 카페 추천
		Dataset<Row> userRecs = model.recommendForAllUsers(10);
		
	
		//추천데이터를 가공
		Dataset<PredictRating> predRatings =  userRecs.flatMap((row) -> {
			
			int userNo = row.getInt(0);
			List<PredictRating> list = 
					new ArrayList<PredictRating>();
			
			List<GenericRowWithSchema> rsList = row.getList(1);
			
			for(GenericRowWithSchema rs : rsList) {
				
				int cafeNo = rs.getInt(0);
				float predictRating = rs.getFloat(1);
				
				
				list.add(new PredictRating(no++,userNo,cafeNo,predictRating));
			}
			return list.iterator();
		}, Encoders.bean(PredictRating.class));
		

		
		//CAFE_RATINGS 테이블 생성 및 추천 결과를 insert
		predRatings.write()
		.mode(SaveMode.Overwrite)
		.format("jdbc")
		.option("numPartitions",4)
		.option("truncate", true)
		.option("dbtable", "\"CAFE_RATINGS\"")
		.option("driver", "oracle.jdbc.OracleDriver")
		.option("url", "jdbc:oracle:thin:@localhost:1521:xe")
		.option("user", "caferecomm")
		.option("password", "1111")
		.save();

		long end = System.currentTimeMillis();

		System.out.println("time:" + (end - start));

		sparkSession.stop();

		
	}
	
	public void getEmotion(String input, int reviewNo) {

		 sparkSession = SparkSession
		 .builder()
		 .appName("EmotionalAnalysisTest")
		 .master("local[*]")
		 .getOrCreate();

			Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);

			//String input = "소속사 YG엔터테인먼트는 30일 \"가족을 통해 지드래곤이 어제 퇴원해 강원도 철원 사단의 부대로 이동했다고 들었다\"고 밝혔다. 발목 치료를 받던 지드래곤은 부대 의무실에서 재활을 이어갈 것으로 알려졌다. ";
			
			KomoranResult analyzeResultList = komoran.analyze(input);

			List<Token> tokenList = analyzeResultList.getTokenList();

			int size = tokenList.size();
			for (int i = 0; i < size; i++) {

				ngrams += tokenList.get(i).getMorph() + "/" + tokenList.get(i).getPos();
				if (i != size - 1) {
					ngrams += ";";
				}
			} // for end
			
			// polarity 데이터셋 생성
			Dataset<Row> polarity = sparkSession.read().format("csv").option("header", "true").option("inferSchema", "true")
					.load("../polarity.csv").persist(StorageLevel.MEMORY_ONLY());

			polarity = polarity.filter(t -> {
				
				String ngram = t.getString(0);
				
				
				return ngrams.contains(ngram);
			});
			
			
			
			polarity.foreach(r->{
				count++;
				positive += r.getDouble(2);
				negative += r.getDouble(3);
				neutral += r.getDouble(4);
				none += r.getDouble(5);
				positive += r.getDouble(6);
				
				System.out.println(r.getString(0));
				
			});
			
			//System.out.println(count);
			
			//System.out.println(positive/count+negative/count+complex/count+neutral/count+none/count);
			
			System.out.println("긍정 : "+positive/count +
					           " / 부정 :"+ negative/count +
					           " / 복합 : " + complex/count +
					           " / 중립 : " + neutral/count+ 
					           " / 없음 : " + none/count
					           );
			ReviewEmotion re = new ReviewEmotion();
			re.setPositive(positive/count);
			re.setNegative(negative/count);
			re.setComplex(complex/count);
			re.setNeutral(neutral/count);
			re.setNone(none/count);
			re.setReviewNo(reviewNo);
			
			reviewEmotionsDAO.insert(re);
	}
}

package com.enigma.caferecomm.util;

import java.util.List;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;

public class MorphologicalAnalysisUtil {
	
	public static List<String> morphologicalAnalysis(String review) {
		
		System.out.println("들어옴");
		Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
		//input = "소속사 YG엔터테인먼트는 30일 \"가족을 통해 지드래곤이 어제 퇴원해 강원도 철원 사단의 부대로 이동했다고 들었다\"고 밝혔다. 발목 치료를 받던 지드래곤은 부대 의무실에서 재활을 이어갈 것으로 알려졌다. ";
		System.out.println(review);
		KomoranResult analyzeResultList = komoran.analyze(review);
		
		List<Token> tokenList = analyzeResultList.getTokenList();
		
		for (Token token : tokenList) {
			System.out.println(token);
			System.out.println(token.getMorph()+"/"+token.getPos()+"("+token.getBeginIndex()+","+token.getEndIndex()+")");
			System.out.println();
		}
		
		//print nouns
		System.out.println("==========print nouns==========");
		
		//이게 명사 리스트(즉, 태그)
		List<String> nouns = analyzeResultList.getNouns();
		System.out.println(nouns);
		return nouns;
	}

	
}

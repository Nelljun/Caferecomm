package com.enigma.caferecomm.configration;

import org.apache.spark.sql.SparkSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebApplicationConfig {

	@Bean
	public SparkSession sparkSession() {
		System.out.println("sparkSession 시작");
		
		SparkSession spark = SparkSession.builder().appName("Spark")
				.master("local").getOrCreate();
		System.out.println("sparkSession 끝");
		System.out.println(spark);
		
		return spark;
	}
}

package com.realdimension.Med3d;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.realdimension.Med3d.VO.horseNameNoVO;
import com.realdimension.Med3d.VO.horseRecordVO;
import com.realdimension.Med3d.service.HorseService;

//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.annotation.Resource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import java.net.MalformedURLException;
import java.net.URL;

import org.jsoup.nodes.Document; 
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

@RestController
public class HorseRecord {

	@Autowired
	HorseService horse_service;
	 
	@Resource(name="horseDetailInfoFilePath")
	String horseDetailInfoFilePath;
	
	
	@RequestMapping(value="/HorseRecordInfo", method=RequestMethod.GET)
	public ModelAndView HorseRecordInfo() throws Exception
	{
		ModelAndView mav = new ModelAndView("/HorseRecordInfo");
		return mav;
	}
	
	@RequestMapping(value="/HorseRecordInfoRes", method=RequestMethod.POST)
	public ModelAndView HorseRecordInfoRes(HttpServletRequest request) throws Exception
	{
		List<horseRecordVO> res_hrvos = new ArrayList<horseRecordVO>();
		
		String[] hrNames = request.getParameterValues("hrName");
		
		for(int i=0; i<hrNames.length; i++) {
			String hrName = new String(hrNames[i].getBytes("8859_1"), "UTF-8");
			HashMap<String, Object>map = new HashMap<String, Object>();
			map.put("hrName", hrName);
			List<horseRecordVO> hrvos = horse_service.HorseInfo(map);
			
			if(hrvos != null) {
				for(int j=0; j<hrvos.size(); j++) {
					res_hrvos.add(hrvos.get(j));
				}
			}	
		}
		ModelAndView mav = new ModelAndView("/HorseRecordInfo");
		mav.addObject("records", res_hrvos);
		return mav;
	}
	
	@RequestMapping(value="/HorseRecordHistory", method=RequestMethod.GET)
	public ModelAndView HorseRecordHistory() throws Exception
	{
		ModelAndView mav = new ModelAndView("/HorseRecordHistory");
		return mav;
	}
	
	@RequestMapping(value="/HorseRecordHistoryRes", method=RequestMethod.POST)
	public ModelAndView HorseRecordHistoryRes(HttpServletRequest request) throws Exception
	{
		String[] hrNames = request.getParameterValues("hrName");
		ArrayList<Element> tables = new ArrayList<Element>();
		
		for(int i=0; i<hrNames.length; i++) {
			String hrName = new String(hrNames[i].getBytes("8859_1"), "UTF-8");
			if(hrName == null || hrName.equals(""))
				continue;
			
			System.out.println("말이름: " + hrName);
			String hrNo = horse_service.HorseNo(hrName);
			System.out.println("말번: " + hrNo);
			URL url = new URL("http://race.kra.co.kr/racehorse/profileRaceScore.do?Act=07&Sub=1&meet=1&hrNo=" + hrNo);
			Document doc = Jsoup.parse(url, 10000);
			Element table = doc.select("table").get(1);
			
			/*Elements rows = table.select("tr");
			for(int a=0; a<rows.size(); a++) {
				Element row = rows.get(a);
				Elements tds = row.select("td");
				
				String temp = "";
				for(int b=0; b<tds.size(); b++) {
					temp += tds.get(b).text();
					temp += "|";
				}
				System.out.println(temp);
			}*/
			System.out.println(table);
			tables.add(table);
		}
		ModelAndView mav = new ModelAndView("/HorseRecordHistory");
		mav.addObject("tables", tables);
		return mav;
	}
	
	/*
	@RequestMapping(value="/InsHorseNameNo", method=RequestMethod.GET)
	public ModelAndView InsHorseNameNo() throws Exception
	{
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(horseDetailInfoFilePath);
		doc.getDocumentElement().normalize();
		NodeList list = doc.getElementsByTagName("item");
		horseNameNoVO hnn = new horseNameNoVO();
		for(int i=0; i<list.getLength(); i++) {
			Node node = list.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element)node;
				hnn = getHorseNameNoVO(element);
				horse_service.insertHorseNameNo(hnn);
			}
		}
		ModelAndView mav = new ModelAndView("/InsHorseRecord");
		return mav;
	}
	
	private horseNameNoVO getHorseNameNoVO(Element elem)
	{
		horseNameNoVO hnn = new horseNameNoVO();
		hnn.setHrName(getNodeValue(elem, "hrName"));
		hnn.setHrNo(getNodeValue(elem, "hrNo"));
		return hnn;
	}
	
	private String getNodeValue(Element elem, String keyword)
	{
		System.out.println(keyword);
		NodeList list = elem.getElementsByTagName(keyword).item(0).getChildNodes();
		Node node = (Node)list.item(0);
		return node.getNodeValue();
	}
	*/
	
}

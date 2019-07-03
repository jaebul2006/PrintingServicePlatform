package com.realdimension.Med3d;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.realdimension.Med3d.VO.horseRecordVO;
import com.realdimension.Med3d.VO.riderRecordVO;
import com.realdimension.Med3d.VO.sectionSpeedVO;
import com.realdimension.Med3d.service.HorseService;

@RestController
public class OpenApiController {

	@Autowired
	HorseService horse_service;
	
	/*
	@Resource(name="horseRecordFilePath")
	String horseRecordFilePath;
	
	@Resource(name="riderRecordFilePath")
	String riderRecordFilePath;
	
	@Resource(name="horseSectionSpeedFilePath")
	String horseSectionSpeedFilePath;
	*/
	
	/*
	// 경주마 구간별 속도 DB에 insert
	@RequestMapping(value="/InsHorseSectionSpeed", method=RequestMethod.GET)
	public ModelAndView InsHorseSectionSpeed()throws Exception
	{
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(horseSectionSpeedFilePath);
		doc.getDocumentElement().normalize();
		NodeList list = doc.getElementsByTagName("item");
		sectionSpeedVO ssvo = new sectionSpeedVO();
		for(int i=0; i<list.getLength(); i++) {
			Node node = list.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element)node;
				ssvo = getSectionSpeedVO(element);
				horse_service.insertSectionSpeed(ssvo);
			}
		}
		ModelAndView mav = new ModelAndView("/InsHorseSectionSpeed");
		return mav;
	}
	*/
	
	private sectionSpeedVO getSectionSpeedVO(Element elem)
	{
		sectionSpeedVO ssvo = new sectionSpeedVO();
		ssvo.setMeet(getNodeValue(elem, "meet"));
		ssvo.setHrName(getNodeValue(elem, "hrName"));
		ssvo.setHrNo(getNodeValue(elem, "hrNo"));
		ssvo.setRcDate(getNodeValue(elem, "rcDate"));
		
		if(isInteger(getNodeValue(elem, "rcNo"))) {
			ssvo.setRcNo(Integer.parseInt(getNodeValue(elem, "rcNo")));
		}
		else {
			ssvo.setRcNo(-1);
		}
		if(isInteger(getNodeValue(elem, "rcDist"))) {
			ssvo.setRcDist(Integer.parseInt(getNodeValue(elem, "rcDist")));
		}
		else {
			ssvo.setRcDist(-1);
		}
		if(isInteger(getNodeValue(elem, "chulNo"))) {
			ssvo.setChulNo(Integer.parseInt(getNodeValue(elem, "chulNo")));
		}
		else {
			ssvo.setChulNo(-1);
		}
		if(isFloat(getNodeValue(elem, "rcTime"))) {
			ssvo.setRcTime(Float.parseFloat(getNodeValue(elem, "rcTime")));
		}
		else {
			ssvo.setRcTime(-1f);
		}
		if(isFloat(getNodeValue(elem, "FRcTimeS1f"))) {
			ssvo.setFRcTimeS1f(Float.parseFloat(getNodeValue(elem, "FRcTimeS1f")));
		}
		else {
			ssvo.setFRcTimeS1f(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTimeS1f"))) {
			ssvo.setSRcTimeS1f(Float.parseFloat(getNodeValue(elem, "SRcTimeS1f")));
		}
		else {
			ssvo.setSRcTimeS1f(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTimeS1f"))) {
			ssvo.setARcTimeS1f(Float.parseFloat(getNodeValue(elem, "ARcTimeS1f")));
		}
		else {
			ssvo.setARcTimeS1f(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTime_1c"))) {
			ssvo.setFRcTime_1c(Float.parseFloat(getNodeValue(elem, "FRcTime_1c")));
		}
		else {
			ssvo.setFRcTime_1c(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTime_1c"))) {
			ssvo.setSRcTime_1c(Float.parseFloat(getNodeValue(elem, "SRcTime_1c")));
		}
		else {
			ssvo.setSRcTime_1c(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTime_1c"))) {
			ssvo.setARcTime_1c(Float.parseFloat(getNodeValue(elem, "ARcTime_1c")));
		}
		else {
			ssvo.setARcTime_1c(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTime_2c"))) {
			ssvo.setFRcTime_2c(Float.parseFloat(getNodeValue(elem, "FRcTime_2c")));
		}
		else {
			ssvo.setFRcTime_2c(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTime_2c"))) {
			ssvo.setSRcTime_2c(Float.parseFloat(getNodeValue(elem, "SRcTime_2c")));
		}
		else {
			ssvo.setSRcTime_2c(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTime_2c"))) {
			ssvo.setARcTime_2c(Float.parseFloat(getNodeValue(elem, "ARcTime_2c")));
		}
		else {
			ssvo.setARcTime_2c(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTime_3c"))) {
			ssvo.setFRcTime_3c(Float.parseFloat(getNodeValue(elem, "FRcTime_3c")));
		}
		else {
			ssvo.setFRcTime_3c(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTime_3c"))) {
			ssvo.setSRcTime_3c(Float.parseFloat(getNodeValue(elem, "SRcTime_3c")));
		}
		else {
			ssvo.setSRcTime_3c(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTime_3c"))) {
			ssvo.setARcTime_3c(Float.parseFloat(getNodeValue(elem, "ARcTime_3c")));
		}
		else {
			ssvo.setARcTime_3c(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTime_4c"))) {
			ssvo.setFRcTime_4c(Float.parseFloat(getNodeValue(elem, "FRcTime_4c")));
		}
		else {
			ssvo.setFRcTime_4c(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTime_4c"))) {
			ssvo.setSRcTime_4c(Float.parseFloat(getNodeValue(elem, "SRcTime_4c")));
		}
		else {
			ssvo.setSRcTime_4c(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTime_4c"))) {
			ssvo.setARcTime_4c(Float.parseFloat(getNodeValue(elem, "ARcTime_4c")));
		}
		else {
			ssvo.setARcTime_4c(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTimeG3f"))) {
			ssvo.setFRcTimeG3f(Float.parseFloat(getNodeValue(elem, "FRcTimeG3f")));
		}
		else {
			ssvo.setFRcTimeG3f(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTimeG3f"))) {
			ssvo.setSRcTimeG3f(Float.parseFloat(getNodeValue(elem, "SRcTimeG3f")));
		}
		else {
			ssvo.setSRcTimeG3f(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTimeG3f"))) {
			ssvo.setARcTimeG3f(Float.parseFloat(getNodeValue(elem, "ARcTimeG3f")));
		}
		else {
			ssvo.setARcTimeG3f(-1f);
		}
		
		if(isFloat(getNodeValue(elem, "FRcTimeG1f"))) {
			ssvo.setFRcTimeG1f(Float.parseFloat(getNodeValue(elem, "FRcTimeG1f")));
		}
		else {
			ssvo.setFRcTimeG1f(-1f);
		}
		if(isFloat(getNodeValue(elem, "SRcTimeG1f"))) {
			ssvo.setSRcTimeG1f(Float.parseFloat(getNodeValue(elem, "SRcTimeG1f")));
		}
		else {
			ssvo.setSRcTimeG1f(-1f);
		}
		if(isFloat(getNodeValue(elem, "ARcTimeG1f"))) {
			ssvo.setARcTimeG1f(Float.parseFloat(getNodeValue(elem, "ARcTimeG1f")));
		}
		else {
			ssvo.setARcTimeG1f(-1f);
		}
		
		return ssvo;
	}
	
	
	/*
	// 기수 정보를 DB에 insert
	@RequestMapping(value="/InsRiderRecord", method=RequestMethod.GET)
	public ModelAndView InsRiderRecord() throws Exception
	{
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(riderRecordFilePath);
		doc.getDocumentElement().normalize();
		NodeList list = doc.getElementsByTagName("item");
		riderRecordVO rdvo = new riderRecordVO();
		for(int i=0; i<list.getLength(); i++) {
			Node node = list.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element)node;
				rdvo = getRiderRecordVO(element);
				horse_service.insertRiderRecord(rdvo);
			}
		}
		ModelAndView mav = new ModelAndView("/InsRiderRecord");
		return mav;
	}
	*/
	
	private riderRecordVO getRiderRecordVO(Element elem)
	{
		riderRecordVO rdvo = new riderRecordVO();
		rdvo.setJkName(getNodeValue(elem, "jkName"));
		rdvo.setJkNo(getNodeValue(elem, "jkNo"));
		rdvo.setMeet(getNodeValue(elem, "meet"));
		
		if(isInteger(getNodeValue(elem, "ord1CntT"))) {
			rdvo.setOrd1CntT(Integer.parseInt(getNodeValue(elem, "ord1CntT")));
		}
		else {
			rdvo.setOrd1CntT(-1);
		}
		if(isInteger(getNodeValue(elem, "ord1CntY"))) {
			rdvo.setOrd1CntY(Integer.parseInt(getNodeValue(elem, "ord1CntY")));
		}
		else {
			rdvo.setOrd1CntY(-1);
		}
		if(isInteger(getNodeValue(elem, "ord2CntT"))) {
			rdvo.setOrd2CntT(Integer.parseInt(getNodeValue(elem, "ord2CntT")));
		}
		else {
			rdvo.setOrd2CntT(-1);
		}
		if(isInteger(getNodeValue(elem, "ord2CntY"))) {
			rdvo.setOrd2CntY(Integer.parseInt(getNodeValue(elem, "ord2CntY")));
		}
		else {
			rdvo.setOrd2CntY(-1);
		}
		
		if(isFloat(getNodeValue(elem, "qnlRateT"))) {
			rdvo.setQnlRateT(Float.parseFloat(getNodeValue(elem, "qnlRateT")));
		}
		else {
			rdvo.setQnlRateT(-1f);
		}
		if(isFloat(getNodeValue(elem, "qnlRateY"))) {
			rdvo.setQnlRateY(Float.parseFloat(getNodeValue(elem, "qnlRateY")));
		}
		else {
			rdvo.setQnlRateY(-1f);
		}
		
		if(isInteger(getNodeValue(elem, "rcCntT"))) {
			rdvo.setRcCntT(Integer.parseInt(getNodeValue(elem, "rcCntT")));
		}
		else {
			rdvo.setRcCntT(-1);
		}
		if(isInteger(getNodeValue(elem, "rcCntY"))) {
			rdvo.setRcCntY(Integer.parseInt(getNodeValue(elem, "rcCntY")));
		}
		else {
			rdvo.setRcCntY(-1);
		}
		
		if(isFloat(getNodeValue(elem, "winRateT"))) {
			rdvo.setWinRateT(Float.parseFloat(getNodeValue(elem, "winRateT")));
		}
		else {
			rdvo.setWinRateT(-1f);
		}
		if(isFloat(getNodeValue(elem, "winRateY"))) {
			rdvo.setWinRateY(Float.parseFloat(getNodeValue(elem, "winRateY")));
		}
		else {
			rdvo.setWinRateY(-1f);
		}
		
		return rdvo;
	}
	
	/*
	// 최근 경주마 이름과 마번을 DB에 insert
	@RequestMapping(value="/InsHorseRecord", method=RequestMethod.GET)
	public ModelAndView InsHorseRecord() throws Exception
	{
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(horseRecordFilePath);
		doc.getDocumentElement().normalize();
		NodeList list = doc.getElementsByTagName("item");
		horseRecordVO hrvo = new horseRecordVO();
		for(int i=0; i<list.getLength(); i++) {
			Node node = list.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element)node;
				hrvo = getHorseRecordVO(element);
				horse_service.insertHorseRecord(hrvo);
			}
		}
		ModelAndView mav = new ModelAndView("/InsHorseRecord");
		return mav;
	}
	*/
	
	private horseRecordVO getHorseRecordVO(Element elem)
	{
		horseRecordVO hrvo = new horseRecordVO();
		/*
		if(isInteger(getNodeValue(elem, "age"))) {
			hrvo.setAge(Integer.parseInt(getNodeValue(elem, "age")));
		}
		else {
			hrvo.setAge(-1);
		}
		if(isInteger(getNodeValue(elem, "chaksunT"))) {
			hrvo.setChaksunT(Integer.parseInt(getNodeValue(elem, "chaksunT")));
		}
		else {
			hrvo.setChaksunT(-1);
		}
		if(isInteger(getNodeValue(elem, "chaksunY"))) {
			hrvo.setChaksunY(Integer.parseInt(getNodeValue(elem, "chaksunY")));
		}
		else {
			hrvo.setChaksunY(-1);
		}
		if(isInteger(getNodeValue(elem, "chaksun_6"))) {
			hrvo.setChaksun_6(Integer.parseInt(getNodeValue(elem, "chaksun_6")));
		}
		else {
			hrvo.setChaksun_6(-1);
		}
		hrvo.setDebut(getNodeValue(elem, "debut"));
		hrvo.setHrName(getNodeValue(elem, "hrName"));
		hrvo.setHrNo(getNodeValue(elem, "hrNo"));
		hrvo.setMeet(getNodeValue(elem, "meet"));
		hrvo.setCtry(getNodeValue(elem, "name")); // 태어난곳 키워드가 name 이다. 주의
		if(isInteger(getNodeValue(elem, "ord1CntT"))) {
			hrvo.setOrd1CntT(Integer.parseInt(getNodeValue(elem, "ord1CntT")));
		}
		else {
			hrvo.setOrd1CntT(-1);
		}
		if(isInteger(getNodeValue(elem, "ord1CntY"))) {
			hrvo.setOrd1CntY(Integer.parseInt(getNodeValue(elem, "ord1CntY")));
		}
		else {
			hrvo.setOrd1CntY(-1);
		}
		if(isInteger(getNodeValue(elem, "ord2CntT"))) {
			hrvo.setOrd2CntT(Integer.parseInt(getNodeValue(elem, "ord2CntT")));
		}
		else {
			hrvo.setOrd2CntT(-1);
		}
		if(isInteger(getNodeValue(elem, "ord2CntY"))) {
			hrvo.setOrd2CntY(Integer.parseInt(getNodeValue(elem, "ord2CntY")));
		}
		else {
			hrvo.setOrd2CntY(-1);
		}
		if(isFloat(getNodeValue(elem, "qnlRateT"))) {
			hrvo.setQnlRateT(Float.parseFloat(getNodeValue(elem, "qnlRateT")));
		}
		else {
			hrvo.setQnlRateT(-1f);
		}
		if(isFloat(getNodeValue(elem, "qnlRateY"))) {
			hrvo.setQnlRateY(Float.parseFloat(getNodeValue(elem, "qnlRateY")));
		}
		else {
			hrvo.setQnlRateY(-1f);
		}
		if(isInteger(getNodeValue(elem, "rcCntT"))) {
			hrvo.setRcCntT(Integer.parseInt(getNodeValue(elem, "rcCntT")));
		}
		else {
			hrvo.setRcCntT(-1);
		}
		if(isInteger(getNodeValue(elem, "rcCntY"))) {
			hrvo.setRcCntY(Integer.parseInt(getNodeValue(elem, "rcCntY")));
		}
		else {
			hrvo.setRcCntY(-1);
		}
		hrvo.setRecentBudam(getNodeValue(elem, "recentBudam"));
		if(isInteger(getNodeValue(elem, "recentOrd"))) {
			hrvo.setRecentOrd(Integer.parseInt(getNodeValue(elem, "recentOrd")));
		}
		else {
			hrvo.setRecentOrd(-1);
		}
		hrvo.setRecentRank(getNodeValue(elem, "recentRank"));
		if(isInteger(getNodeValue(elem, "recentRating"))) {
			hrvo.setRecentRating(Integer.parseInt(getNodeValue(elem, "recentRating")));
		}
		else {
			hrvo.setRecentRating(-1);
		}
		hrvo.setRecentRcDate(getNodeValue(elem, "recentRcDate"));
		if(isInteger(getNodeValue(elem, "recentRcDist"))) {
			hrvo.setRecentRcDist(Integer.parseInt(getNodeValue(elem, "recentRcDist")));
		}
		else {
			hrvo.setRecentRcDist(-1);
		}
		hrvo.setRecentRcName(getNodeValue(elem, "recentRcName"));
		if(isInteger(getNodeValue(elem, "recentRcNo"))) {
			hrvo.setRecentRcNo(Integer.parseInt(getNodeValue(elem, "recentRcNo")));
		}
		else {
			hrvo.setRecentRcNo(-1);
		}
		if(isFloat(getNodeValue(elem, "recentRcTime"))) {
			hrvo.setRecentRcTime(Float.parseFloat(getNodeValue(elem, "recentRcTime")));
		}
		else {
			hrvo.setRecentRcTime(-1f);
		}
		if(isFloat(getNodeValue(elem, "recentWgBudam"))) {
			hrvo.setRecentWgBudam(Float.parseFloat(getNodeValue(elem, "recentWgBudam")));
		}
		else {
			hrvo.setRecentWgBudam(-1f);
		}
		if(isFloat(getNodeValue(elem, "recentWgHr"))) {
			hrvo.setRecentWgHr(Float.parseFloat(getNodeValue(elem, "recentWgHr")));
		}
		else {
			hrvo.setRecentWgHr(-1f);
		}
		hrvo.setSex(getNodeValue(elem, "sex"));
		if(isFloat(getNodeValue(elem, "winRateT"))) {
			hrvo.setWinRateT(Float.parseFloat(getNodeValue(elem, "winRateT")));
		}
		else {
			hrvo.setWinRateT(-1f);
		}
		if(isFloat(getNodeValue(elem, "winRateY"))) {
			hrvo.setWinRateY(Float.parseFloat(getNodeValue(elem, "winRateY")));
		}
		else {
			hrvo.setWinRateY(-1f);
		}
		*/
		return hrvo;
	}
	
	private String getNodeValue(Element elem, String keyword)
	{
		System.out.println(keyword);
		NodeList list = elem.getElementsByTagName(keyword).item(0).getChildNodes();
		Node node = (Node)list.item(0);
		return node.getNodeValue();
	}
	
	private boolean isInteger(String str)
	{
		try {
			Integer.valueOf(str);
			return true;
		}
		catch(NumberFormatException e) {
			return false;
		}
	}
	
	private boolean isFloat(String str)
	{
		try {
			Float.valueOf(str);
			return true;
		}
		catch(NumberFormatException e) {
			return false;
		}
	}
	
	@RequestMapping(value="/HorseRecord", method=RequestMethod.GET)
	public ModelAndView HorseRecord() throws Exception
	{
		ModelAndView mav = new ModelAndView("/HorseRecord");
		return mav;
	}
	
	@RequestMapping(value="/HorseInfo", method=RequestMethod.POST)
	public ModelAndView HorseInfo(@RequestParam("hrName")String hrName) throws Exception
	{
		String nhrName = new String(hrName.getBytes("8859_1"), "UTF-8");
		//horseRecordVO hrvo = horse_service.HorseInfo(nhrName);
		ModelAndView mav = new ModelAndView("/HorseRecord");
		//mav.addObject("hrvo", hrvo);
		return mav;
	}
	
	@RequestMapping(value="/HorsePredic", method=RequestMethod.GET)
	public ModelAndView HorsePredic() throws Exception
	{
		ModelAndView mav = new ModelAndView("/HorsePredic");
		return mav;
	}
	 
	@RequestMapping(value="/HorsePredicRes", method=RequestMethod.POST)
	public ModelAndView HorsePredicRes(HttpServletRequest request) throws Exception
	{
		String[] hrNames = request.getParameterValues("hrName");
		//String[] jkNames = request.getParameterValues("jkName");
		
		List<horseRecordVO> hrvo_list = new ArrayList<horseRecordVO>();
		
		/*
		for(int i=0; i<hrNames.length; i++) {
			String hrName = new String(hrNames[i].getBytes("8859_1"), "UTF-8");
			//String jkName = new String(jkNames[i].getBytes("8859_1"), "UTF-8");
			horseRecordVO hrvo = horse_service.HorseInfo(hrName);
			//riderRecordVO rdvo = horse_service.RiderInfo(jkName);
			
			//float horse_score = HorseRiderPower(hrvo, rdvo, i+1);
			float horse_score = HorsePowerClassic(hrvo, i+1);
			
			if(hrvo != null) {
				hrvo.setLane(i+1);
				hrvo.setRes_score(horse_score);
				hrvo_list.add(hrvo);
			}	
		}
		
		System.out.println("---------------------------");
		for(int i=0; i<hrvo_list.size(); i++) {
			if(hrvo_list.get(i) != null) {
				System.out.println(hrvo_list.get(i).getLane() + "/" + hrvo_list.get(i).getHrName() + "/" + hrvo_list.get(i).getRes_score());
			}
		}
		System.out.println("---------------------------");
		MiniComparator comp = new MiniComparator();
		Collections.sort(hrvo_list, comp);
		for(int i=0; i<hrvo_list.size(); i++) {
			if(hrvo_list.get(i) != null) {
				System.out.println(hrvo_list.get(i).getLane() + "/" + hrvo_list.get(i).getHrName() + "/" + hrvo_list.get(i).getRes_score());
			}
		}
		*/
		
		ModelAndView mav = new ModelAndView("/HorsePredic");
		mav.addObject("hrvo_list", hrvo_list);
		return mav;
	}
	
	private float HorseRiderPower(horseRecordVO hrvo, riderRecordVO rdvo, int lane)
	{
		float res = -1;
		if(hrvo == null || rdvo == null) {
			return res;
		}
		/*
		float param1 = (float)hrvo.getOrd1CntY() * 0.4f;
		float param2 = (float)hrvo.getOrd2CntY() * 0.25f;
		float param3 = (float)(1 - lane) * 0.05f;
		float param4 = ((float)hrvo.getRecentRcDist() / (float)hrvo.getRecentRcTime()) * 0.05f;
		
		float param5 = 0f;
		float param6 = 0f;
		
		if(rdvo.getRcCntT() > 100) {
			param5 = (float)rdvo.getQnlRateY() * 0.2f;
			param6 = (float)rdvo.getWinRateY() * 0.33f;
		}
		else if(rdvo.getRcCntT() > 30) {			
			param5 = (float)rdvo.getQnlRateY() * 0.16f;
			param6 = (float)rdvo.getWinRateY() * 0.23f;
		}
		else {
			param5 = (float)rdvo.getQnlRateY() * 0.08f;
			param6 = (float)rdvo.getWinRateY() * 0.14f;
		}
		
		res = param1 + param2 + param3 + param4 + param5 + param6;
		*/
		return res;
	}
	
	private float HorsePowerClassic(horseRecordVO hrvo, int lane)
	{
		float res = -1;
		/*
		if(hrvo == null) {
			return res;
		}
		float param1 = (float)hrvo.getOrd1CntY() * 0.4f;
		float param2 = (float)hrvo.getOrd2CntY() * 0.25f;
		float param3 = 0f; //(float)(1 - lane) * 0.035f;
		float param4 = ((float)hrvo.getRecentRcDist() / (float)hrvo.getRecentRcTime()) * 0.1f;
		
		res = param1 + param2 + param3 + param4;
		*/
		return res;
	}
	
}

class MiniComparator implements Comparator<horseRecordVO>{
	@Override
	public int compare(horseRecordVO first, horseRecordVO second) {
		if(first == null || second == null) {
			return 0;
		}
		float first_v = 0f;//first.getRes_score();
		float second_v = 0f;//second.getRes_score();
		if(first_v > second_v) {
			return -1;
		}
		else if(first_v < second_v) {
			return 1;
		}
		else {
			return 0;
		}
	}
}

package com.realdimension.Med3d;

import org.springframework.stereotype.Controller;
import java.io.InputStream;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.realdimension.Med3d.service.ProductOrderService;

@Controller
public class UploadFileController {

	private static final Logger logger = LoggerFactory.getLogger(UploadFileController.class);
	
	@Resource(name="uploadPath")
	String uploadPath;
	
	@Inject
	ProductOrderService productOrderService;
	
	@RequestMapping(value="/upload/upload3dScanData", method=RequestMethod.GET)
	public void upload3dScanData()
	{
	}
	
	@ResponseBody
	@RequestMapping(value="/upload/upload3dScanData", method=RequestMethod.POST, produces="text/plain;charset=utf-8")
	public ResponseEntity<String> upload3dScanData(MultipartFile file, HttpServletRequest request) throws Exception
	{
		logger.info("originalName : " + file.getOriginalFilename());
		logger.info("size : " + file.getSize());
		logger.info("contentType : " + file.getContentType());
		
		return new ResponseEntity<String>(UploadFileUtils.uploadFileStream(uploadPath, file.getOriginalFilename(), file.getBytes(), file), HttpStatus.OK);
	}
	
	@ResponseBody
	@RequestMapping("/upload/displayFile")
	public ResponseEntity<byte[]> displayFile(String fileName) throws Exception
	{
		InputStream in = null;
		ResponseEntity<byte[]> entity = null;
		
		try {
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
			MediaType mType = MediaUtils.getMediaType(formatName);
			
		}
		catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		}
		finally {
			in.close();
		}
		return entity;
	}
	
}

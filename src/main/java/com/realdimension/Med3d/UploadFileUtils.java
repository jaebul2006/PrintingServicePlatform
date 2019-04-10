package com.realdimension.Med3d;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

public class UploadFileUtils {

private static final Logger logger = LoggerFactory.getLogger(UploadFileUtils.class);
	
	// 메모리 스트리밍을 하지않으면 한번에 큰 용량의 파일을 처리할 때 out of memory 가 발생한다.
	public static String uploadFile(String uploadPath, String originalName, byte[] fileData) throws Exception
	{
		UUID uuid = UUID.randomUUID();
		String savedName = uuid.toString() + "_" + originalName;
		String savedPath = calcPath(uploadPath);
		
		logger.info("uploadPath:{}", uploadPath);
		logger.info("savePath:{}", savedPath);
		
		File target = new File(uploadPath + savedPath, savedName);
		
		FileCopyUtils.copy(fileData, target);
		String formatName = originalName.substring(originalName.lastIndexOf(".")+1);
		String uploadedFileName = null;
		
		if(MediaUtils.getMediaType(formatName) != null)
		{
			uploadedFileName = makeThumbnail(uploadPath, savedPath, savedName);
		}
		else
		{
			uploadedFileName = makeIcon(uploadPath, savedPath, savedName);
		}
		return uploadedFileName;
	}
	
	// 메모리 스트리밍을 하지않으면 한번에 큰 용량의 파일을 처리할 때 out of memory 가 발생한다.
	public static String uploadFileStream(String uploadPath, String originalName, byte[] fileData, MultipartFile multipartfile) throws Exception
	{
		UUID uuid = UUID.randomUUID();
		String savedName = uuid.toString() + "_" + originalName;
		String savedPath = calcPath(uploadPath);
		
		byte[] bufferedbytes = new byte[4096];
		File target = new File(uploadPath + savedPath, savedName);
		FileOutputStream outStream = null;
		int count = 0;
		try {
			BufferedInputStream fileInputStream = new BufferedInputStream(multipartfile.getInputStream());
			outStream = new FileOutputStream(target);
			while((count = fileInputStream.read(bufferedbytes)) != -1){
				outStream.write(bufferedbytes, 0, count);
			}
			outStream.close();
		}
		catch(IOException e){
			logger.info("upload error:{}", e);
		}
		
		String formatName = originalName.substring(originalName.lastIndexOf(".")+1);
		String uploadedFileName = null;
		
		if(MediaUtils.getMediaType(formatName) != null)
		{
			uploadedFileName = makeThumbnail(uploadPath, savedPath, savedName);
		}
		else
		{
			uploadedFileName = makeIcon(uploadPath, savedPath, savedName);
		}
		return uploadedFileName;
	}
	
	private static String calcPath(String uploadPath)
	{
		Calendar cal = Calendar.getInstance();
		String yearPath = File.separator + cal.get(Calendar.YEAR);
		System.out.println(yearPath);
		String monthPath = yearPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
		System.out.println(monthPath);
		String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));
		System.out.println(datePath);
		makeDir(uploadPath, yearPath, monthPath, datePath);
		return datePath;
	}
	
	private static void makeDir(String uploadPath, String... paths)
	{
		if(new File(paths[paths.length - 1]).exists())
		{
			return;
		}
		for(String path: paths)
		{
			File dirPath = new File(uploadPath + path);
			if(!dirPath.exists())
			{
				dirPath.mkdir();
			}
		}
	}
	
	private static String makeThumbnail(String uploadPath, String path, String fileName) throws Exception
	{
		BufferedImage sourceImg = ImageIO.read(new File(uploadPath + path, fileName));
		BufferedImage destImg = Scalr.resize(sourceImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 100);
		String thumbnailName = uploadPath + path + File.separator + "s_" + fileName;
		File newFile = new File(thumbnailName);
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
		ImageIO.write(destImg, formatName.toUpperCase(), newFile);
		return thumbnailName.substring(uploadPath.length()).replace(File.separatorChar, '/');
	}
	
	private static String makeIcon(String uploadPath, String path, String fileName) throws Exception
	{
		String iconName = uploadPath + path + File.separator + fileName;
		return iconName.substring(uploadPath.length()).replace(File.separatorChar, '/');
	}
	
}

package backend.main.java;

import backend.main.java.database.DataAccessShopDatabase;
import backend.main.java.models.Article;
import backend.main.java.models.ArticleVersion;
import backend.main.java.models.Order;

import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import javax.xml.crypto.Data;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.security.SecureRandom;
import java.util.Objects;

public class Logic
{
	static DataAccessShopDatabase Database = new DataAccessShopDatabase();

	public static Response login(final String mail, final String password, String ip)
	{
		System.out.println("comment");
		if (mail.equals("secretUser") && password.equals("secretPassword")) {
			FlawHandler.htmlCommentUser(ip);
		}
		boolean session = Database.checkAuthData(mail, password);
		if (!session) return null;
		String sessionID = createSessionId();
		Database.postSession(sessionID, mail, ip);
		return Response.ok(sessionID).cookie(new NewCookie("sessionID", sessionID)).build();
	}

	public static Response logout(String session) {
		Database.deleteSession(session);
		return Response.ok().build();
	}

	private static String createSessionId()
	{
		SecureRandom GENERATOR = new SecureRandom();
		byte[] token = new byte[32];
		GENERATOR.nextBytes(token);
		return Base64.getEncoder().encodeToString(token);
	}


	public static double computePrice(List<Article> articles)
	{
		double sum = 0;
		for (Article article : articles)
		{
			sum += article.getAmount();
		}
		return sum;
	}

	public static String preventSQL(int level, String request)
	{
		if (level == 1)
		{
			return request.replace("SELECT", "");
		}
		else if (level == 2)
		{
			return request.replace("'", "");
		}
		return request;
	}

	public static String preventXSS(int level, String request)
	{
		if (level == 1)
		{
			return request.replace("script", "");
		}
		else if (level == 2)
		{
			return request.replace("<script>", "");
		}
		return request;
	}

	public static boolean checkXSS(String request) {
		return request.contains("<script>") || request.contains("<img onerror=");
	}

	public static void checkPrice(Order order, String remoteAddr)
	{
		List<ArticleVersion> articleVersions = order.getSpecifiedItems();
		DataAccessShopDatabase dasb = new DataAccessShopDatabase();
		List<Article> articles = new ArrayList<>();
		for (ArticleVersion articleVersion : articleVersions)
		{
			System.out.println(articleVersion.getArticleNumber());
			articles.add(dasb.getArticle(articleVersion.getArticleNumber()));
		}
		System.out.println(computePrice(articles));
		System.out.println(order.getAmount());
		if (computePrice(articles) != order.getAmount()) {
			FlawHandler.priceOrder(remoteAddr);
		}
	}
}

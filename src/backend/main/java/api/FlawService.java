package backend.main.java.api;

import backend.main.java.database.DataAccessAdminPanel;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("flaws") public class FlawService
{
	@GET @Produces(MediaType.APPLICATION_JSON) public Response checkFlaws(
		@CookieParam("sessionID") final String session, @Context HttpServletRequest request)
	{
		DataAccessAdminPanel daap = new DataAccessAdminPanel();
		List<String> findings = daap.checkForNewFindings(request.getRemoteAddr());
		return Response.ok(findings).build();
	}
}

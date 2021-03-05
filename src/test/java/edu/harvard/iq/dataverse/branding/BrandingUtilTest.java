package edu.harvard.iq.dataverse.branding;

import edu.harvard.iq.dataverse.DataverseServiceBean;
import edu.harvard.iq.dataverse.settings.Setting;
import edu.harvard.iq.dataverse.settings.SettingsServiceBean;
import edu.harvard.iq.dataverse.settings.source.DbSettingConfigSource;
import edu.harvard.iq.dataverse.util.BundleUtil;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import static org.junit.Assert.assertEquals;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
public class BrandingUtilTest {

    DbSettingConfigSource dbSource = new DbSettingConfigSource();
    @Mock
    SettingsServiceBean settingsSvc;
    @Mock
    DataverseServiceBean dataverseService;
    
    @Test
    @Order(1)
    public void testGetInstallationBrandName() {
        
//      Set<Setting> settings = new HashSet<>(Arrays.asList(new Setting("InstitutionName", "LibraScholar"), new Setting("FooBarI18N", "de", "hallo")));
        Mockito.when(dataverseService.getRootDataverseName()).thenReturn("LibraScholar");
        BrandingUtil.injectDataverseService(dataverseService);
//      DbSettingConfigSource.injectSettingsService(settingsSvc);
        System.out.println("testGetInstallationBrandName");
        assertEquals("LibraScholar", BrandingUtil.getInstallationBrandName());

        Set<Setting> settings = new HashSet<>(Arrays.asList(new Setting("InstitutionName", "NotLibraScholar")));
        Mockito.when(settingsSvc.listAll()).thenReturn(settings);
        DbSettingConfigSource.injectSettingsService(settingsSvc);
        assertEquals("NotLibraScholar", BrandingUtil.getInstallationBrandName());// misconfiguration to set to null
        
        //Reset for other tests
        settings.clear();
        settings.add(new Setting("InstitutionName", "LibraScholar"));
    }

    @Test
    public void testGetSupportTeamName() throws AddressException, UnsupportedEncodingException {
        System.out.println("testGetSupportTeamName");
        Mockito.when(dataverseService.getRootDataverseName()).thenReturn(null);
        BrandingUtil.injectDataverseService(dataverseService);
        assertEquals("Support", BrandingUtil.getSupportTeamName(null));
        Mockito.when(dataverseService.getRootDataverseName()).thenReturn("");
        BrandingUtil.injectDataverseService(dataverseService);
        assertEquals("Support", BrandingUtil.getSupportTeamName(null));
        Mockito.when(dataverseService.getRootDataverseName()).thenReturn("LibraScholar");
        BrandingUtil.injectDataverseService(dataverseService);
        assertEquals("LibraScholar Support", BrandingUtil.getSupportTeamName(null));
        assertEquals("LibraScholar Support", BrandingUtil.getSupportTeamName(new InternetAddress("support@librascholar.edu")));
        assertEquals("LibraScholar Support Team", BrandingUtil.getSupportTeamName(new InternetAddress("support@librascholar.edu", "LibraScholar Support Team")));
        assertEquals("", BrandingUtil.getSupportTeamName(new InternetAddress("support@librascholar.edu", ""))); // misconfiguration to set to empty string
    }

    @Test
    public void testGetSupportEmailAddress() throws AddressException, UnsupportedEncodingException {
        System.out.println("testGetSupportEmailAddress");
        assertEquals(null, BrandingUtil.getSupportTeamEmailAddress(null));
        assertEquals("support@librascholar.edu", BrandingUtil.getSupportTeamEmailAddress(new InternetAddress("support@librascholar.edu")));
        assertEquals("support@librascholar.edu", BrandingUtil.getSupportTeamEmailAddress(new InternetAddress("support@librascholar.edu", "LibraScholar Support Team")));
        assertEquals("support@librascholar.edu", BrandingUtil.getSupportTeamEmailAddress(new InternetAddress("support@librascholar.edu", ""))); // misconfiguration to set to empty string but doesn't matter
        assertEquals(null, BrandingUtil.getSupportTeamEmailAddress(new InternetAddress(null, "LibraScholar Support Team"))); // misconfiguration to set to null
        assertEquals("", BrandingUtil.getSupportTeamEmailAddress(new InternetAddress("", "LibraScholar Support Team"))); // misconfiguration to set to empty string
    }

    @Test
    public void testWelcomeInAppNotification() {
        System.out.println("testWelcomeInAppNotification");
        String message = BundleUtil.getStringFromBundle("notification.welcome",
                Arrays.asList(
                        "LibraScholar",
                        "<a href=\"http://guides.dataverse.org/en/4.3/user/index.html\">User Guide</a>",
                        "<a href=\"https://demo.dataverse.org\">Demo Site</a>"
                ));
        System.out.println("message: " + message);
        assertEquals("Welcome to LibraScholar! Get started by adding or finding data. "
                + "Have questions? Check out the <a href=\"http://guides.dataverse.org/en/4.3/user/index.html\">User Guide</a>."
                + " Want to test out Dataverse features? Use our <a href=\"https://demo.dataverse.org\">Demo Site</a>."
                + " Also, check for your welcome email to verify your address.",
                message);
    }

    @Test
    public void testWelcomeEmail() {
        System.out.println("testWelcomeEmail");
        String message = BundleUtil.getStringFromBundle("notification.email.welcome",
                Arrays.asList(
                        "LibraScholar",
                        "http://guides.librascholar.edu/en",
                        "4.3",
                        "LibraScholar Support",
                        "support@librascholar.edu"
                ));
        System.out.println("message: " + message);
        assertEquals("Welcome to LibraScholar! Get started by adding or finding data. "
                + "Have questions? Check out the User Guide at http://guides.librascholar.edu/en/4.3/user or"
                + " contact LibraScholar Support at support@librascholar.edu for assistance.",
                message);
    }

    @Test
    public void testEmailClosing() {
        System.out.println("testEmailClosing");
        String message = BundleUtil.getStringFromBundle("notification.email.closing",
                Arrays.asList(
                        "support@librascholar.edu",
                        "LibraScholar Support Team"
                ));
        System.out.println("message: " + message);
        assertEquals("\n\nYou may contact us for support at support@librascholar.edu.\n\nThank you,\nLibraScholar Support Team",
                message);
    }

    @Test
    public void testEmailSubject() {
        System.out.println("testEmailSubject");
        String message = BundleUtil.getStringFromBundle("notification.email.create.account.subject",
                Arrays.asList(
                        "LibraScholar"
                ));
        System.out.println("message: " + message);
        assertEquals("LibraScholar: Your account has been created",
                message);
    }

    @Test
    public void testGetContactHeader() {
        System.out.println("testGetContactHeader");
        Mockito.when(dataverseService.getRootDataverseName()).thenReturn(null);
        BrandingUtil.injectDataverseService(dataverseService);
        assertEquals("Contact Support", BrandingUtil.getContactHeader(null));
    }

}

import MB.Percentage;
import MB.Repeat;

import javax.management.*;
import java.lang.management.ManagementFactory;

public class Main {
    public static void main(String[] args) throws MalformedObjectNameException, NotCompliantMBeanException, InstanceAlreadyExistsException, MBeanRegistrationException {
        System.out.println("Trying to Read beans.\n");
        MBeanServer server = ManagementFactory.getPlatformMBeanServer();
        String domainName = "MyBean";
        ObjectName pName = new ObjectName(domainName+":name=percentage");
        ObjectName rName = new ObjectName(domainName+":name=repeat");
        server.registerMBean(new Repeat(), rName);
        server.registerMBean(new Percentage(), pName);
        while(true){

        }
    }
}

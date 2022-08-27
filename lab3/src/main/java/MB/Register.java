package MB;

import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

/**
 * @author x1761
 */
@Data
@SessionScoped
@ManagedBean(name = "register")
public class Register implements RegisterMbean{
    public void register(){
        System.out.println("Trying to Read beans.\n");
        try {
            System.out.println("Trying to Read beans.\n");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}

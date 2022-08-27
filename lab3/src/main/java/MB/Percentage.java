package MB;

import lombok.Data;
import Data.Dot;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@Data
@SessionScoped
@ManagedBean(name = "percentage")
public class Percentage implements PercentageMBean {
    private int all_nums = 0;
    private int hit = 0;
    private double percentage = 0;
    private Dot dot = new Dot();
    @Override
    public void percentageGet() {
        update();
        if(all_nums!=0){
            this.percentage = (double) Math.round(hit*100/all_nums)/100;
        }
    }

    public void update(){
        dot = new Dot(dot.getX(),dot.getY(),dot.getR());
        if(dot.isHit()){
            hit = hit+1;
        }
        all_nums = all_nums + 1;
    }
}

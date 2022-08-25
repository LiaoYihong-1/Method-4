package MB;

import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.util.ArrayList;

import Data.Dot;
@Data
@SessionScoped
@ManagedBean(name = "lab4")
public class Repeat implements RepeatMBean {
    public ArrayList<Dot> all_dots = new ArrayList<>();
    private ArrayList<Dot> three_dot = new ArrayList<>();
    public ArrayList<Dot> not_in_range = new ArrayList<>();
    public Dot d = new Dot();
    public int nums_total = all_dots.size();
    public int nums_not_hit = not_in_range.size();
    public boolean repeated = false;
    @Override
    public void checkRepeat() {
        this.repeated = true;
        if(three_dot.size() < 3){
            this.repeated = false;
            return;
        }
        for(Dot d : three_dot){
            if(d.isHit()){
                this.repeated = false;
            }
        }
    }
    public void addDot(){
        this.d = new Dot(d.getX(),d.getY(),d.getR());
        all_dots.add(d);
        if(!d.isHit()){
            not_in_range.add(d);
        }
        if(three_dot.size()==3){
            three_dot.remove(0);
            three_dot.add(d);
        }else {
            three_dot.add(d);
        }
        checkRepeat();
        nums_total = all_dots.size();
        nums_not_hit = not_in_range.size();
    }
}

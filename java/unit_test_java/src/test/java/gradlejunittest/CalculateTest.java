import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculateTest
{
  @Test
  public void evaluateExpression()
  {
    Calculate caculate = new Calculate();
    int sum = caculate.evaluate("1+2+3");
    assertEquals(6,sum);
  }
}

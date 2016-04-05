public class Calculate
{
  public int evaluate(String expression)
  {
    int sum = 0;
    for(String num:expression.split("\\+"))
    {
      sum += Integer.valueOf(num);
    }
    return sum;
  }
}

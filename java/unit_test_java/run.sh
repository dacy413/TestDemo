javac Calculate.java
javac -cp .:junit-4.12.jar CalculateTest.java
java -cp .:junit-4.12.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore CalculateTest

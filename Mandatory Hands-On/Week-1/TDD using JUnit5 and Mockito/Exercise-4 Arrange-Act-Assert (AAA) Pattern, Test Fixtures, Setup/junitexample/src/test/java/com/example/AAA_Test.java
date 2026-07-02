package com.example;

import org.junit.After;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

public class AAA_Test {

    private int a;
    private int b;


    @Before
    public void setUp() {
        System.out.println("Setting up test data");
        a = 10;
        b = 5;
    }

    @After
    public void tearDown() {
        System.out.println("Cleaning up after test");
    }


    @Test
    public void testAddition() {

  
        
       
        int result = a + b;

      
        assertEquals(15, result);
    }

    @Test
    public void testSubtraction() {

        

     
        int result = a - b;

        assertEquals(5, result);
    }
}
package com.example.spring_data_jpa_handson.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_data_jpa_handson.entity.Employee;
import com.example.spring_data_jpa_handson.service.EmployeeService;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping("/employee")
    public Employee saveEmployee(@RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

}
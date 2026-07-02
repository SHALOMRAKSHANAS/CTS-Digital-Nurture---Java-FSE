package com.example.spring_data_jpa_handson.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spring_data_jpa_handson.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
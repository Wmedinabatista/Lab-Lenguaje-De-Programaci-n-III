package com.sistemacontactos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {

private static final String URL = "jdbc:sqlite:contactos.db";

public static Connection conectar() {

Connection conexion = null;

try {
conexion = DriverManager.getConnection(URL);
System.out.println("Conexion con SQLite establecida correctamente.");

} catch (SQLException e) {
System.out.println("Error al conectar con la base de datos: " + e.getMessage());
        
}

return conexion;
    
}

}
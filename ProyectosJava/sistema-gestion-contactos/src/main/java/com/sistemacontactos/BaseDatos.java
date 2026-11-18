package com.sistemacontactos;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class BaseDatos {

public static void crearTabla() {

String sql = """
CREATE TABLE IF NOT EXISTS contactos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT NOT NULL,
apellido TEXT NOT NULL,
telefono TEXT,
correo TEXT,
direccion TEXT
);
""";

try (Connection conexion = Conexion.conectar();
Statement sentencia = conexion.createStatement()) {

sentencia.execute(sql);

System.out.println("Tabla de contactos creada correctamente.");

} catch (SQLException e) {
System.out.println("Error al crear la tabla: " + e.getMessage());
        
}
    
}

}
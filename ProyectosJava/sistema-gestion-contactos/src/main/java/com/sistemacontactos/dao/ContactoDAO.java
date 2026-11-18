package com.sistemacontactos.dao;

import com.sistemacontactos.Conexion;
import com.sistemacontactos.modelo.Contacto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ContactoDAO {

// Registrar un contacto
public boolean registrar(Contacto contacto) {

String sql = """
INSERT INTO contactos (nombre, apellido, telefono, correo, direccion)
VALUES (?, ?, ?, ?, ?)
""";

try (Connection conexion = Conexion.conectar();
PreparedStatement sentencia = conexion.prepareStatement(sql)) {

sentencia.setString(1, contacto.getNombre());
sentencia.setString(2, contacto.getApellido());
sentencia.setString(3, contacto.getTelefono());
sentencia.setString(4, contacto.getCorreo());
sentencia.setString(5, contacto.getDireccion());

sentencia.executeUpdate();

System.out.println("Contacto registrado correctamente.");
return true;

} catch (SQLException e) {
System.out.println("Error al registrar contacto: " + e.getMessage());
return false;

}
    
}

// Consultar todos los contactos
public List<Contacto> listar() {

List<Contacto> contactos = new ArrayList<>();

String sql = "SELECT * FROM contactos";

try (Connection conexion = Conexion.conectar();
PreparedStatement sentencia = conexion.prepareStatement(sql);
ResultSet resultado = sentencia.executeQuery()) {

while (resultado.next()) {

Contacto contacto = new Contacto(
resultado.getInt("id"),
resultado.getString("nombre"),
resultado.getString("apellido"),
resultado.getString("telefono"),
resultado.getString("correo"),
resultado.getString("direccion")
                
);

contactos.add(contacto);
            
}

} catch (SQLException e) {
System.out.println("Error al consultar contactos: " + e.getMessage());
        
}

return contactos;
    
}

// Actualizar un contacto
public boolean actualizar(Contacto contacto) {

String sql = """
UPDATE contactos
SET nombre = ?, apellido = ?, telefono = ?, correo = ?, direccion = ?
WHERE id = ?
""";

try (Connection conexion = Conexion.conectar();
PreparedStatement sentencia = conexion.prepareStatement(sql)) {

sentencia.setString(1, contacto.getNombre());
sentencia.setString(2, contacto.getApellido());
sentencia.setString(3, contacto.getTelefono());
sentencia.setString(4, contacto.getCorreo());
sentencia.setString(5, contacto.getDireccion());
sentencia.setInt(6, contacto.getId());

return sentencia.executeUpdate() > 0;

} catch (SQLException e) {
System.out.println("Error al actualizar contacto: " + e.getMessage());
return false;
        
}
    
}

// Eliminar un contacto
public boolean eliminar(int id) {

String sql = "DELETE FROM contactos WHERE id = ?";

try (Connection conexion = Conexion.conectar();
PreparedStatement sentencia = conexion.prepareStatement(sql)) {

sentencia.setInt(1, id);

return sentencia.executeUpdate() > 0;

} catch (SQLException e) {
System.out.println("Error al eliminar contacto: " + e.getMessage());
return false;
        
}
    
}

}
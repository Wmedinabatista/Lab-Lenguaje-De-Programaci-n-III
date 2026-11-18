package com.sistemacontactos;

import com.sistemacontactos.dao.ContactoDAO;
import com.sistemacontactos.modelo.Contacto;

import org.junit.Test;

import java.util.List;
import java.util.UUID;

import static org.junit.Assert.*;

public class AppTest {

@Test
public void probarOperacionesCRUD() {

// Crear la tabla si todavía no existe
BaseDatos.crearTabla();

ContactoDAO dao = new ContactoDAO();

// Identificador unico para el contacto de prueba
String correoPrueba = "prueba-" + UUID.randomUUID() + "@test.com";

int idContacto = 0;

try {

// 1. REGISTRAR CONTACTO

Contacto nuevo = new Contacto(
0,
"Wilmy",
"Prueba",
"8091234567",
correoPrueba,
"Santo Domingo"
            
);

assertTrue("No se pudo registrar el contacto",
dao.registrar(nuevo));

System.out.println("PRUEBA 1: Registro correcto.");

// 2. CONSULTAR CONTACTO

List<Contacto> contactos = dao.listar();

Contacto encontrado = null;

for (Contacto c : contactos) {
if (correoPrueba.equals(c.getCorreo())) {
encontrado = c;
break;
                
}
            
}

assertNotNull("No se encontro el contacto registrado",
encontrado);

idContacto = encontrado.getId();

System.out.println("PRUEBA 2: Consulta correcta.");

// 3. ACTUALIZAR CONTACTO

Contacto actualizado = new Contacto(
idContacto,
"Wilmy",
"Medina",
"8095555555",
correoPrueba,
"Santo Domingo Este"
            
);

assertTrue("No se pudo actualizar el contacto",
dao.actualizar(actualizado));

Contacto modificado = null;

for (Contacto c : dao.listar()) {
if (c.getId() == idContacto) {
modificado = c;
break;
}
            
}

assertNotNull("No se encontro el contacto actualizado",
modificado);

assertEquals("Medina", modificado.getApellido());
assertEquals("8095555555", modificado.getTelefono());
assertEquals("Santo Domingo Este", modificado.getDireccion());

System.out.println("PRUEBA 3: Actualizacion correcta.");

// 4. ELIMINAR CONTACTO

assertTrue("No se pudo eliminar el contacto",
dao.eliminar(idContacto));

idContacto = 0;

boolean existe = false;

for (Contacto c : dao.listar()) {
if (correoPrueba.equals(c.getCorreo())) {
existe = true;
break;
                
}
            
}

assertFalse("El contacto todavia existe en la base de datos",
existe);

System.out.println("PRUEBA 4: Eliminacion correcta.");

System.out.println("TODAS LAS PRUEBAS CRUD FINALIZARON CORRECTAMENTE.");

} finally {

// Limpiar el contacto de prueba si ocurre algun error
for (Contacto c : dao.listar()) {
if (correoPrueba.equals(c.getCorreo())) {
dao.eliminar(c.getId());
                
}
            
}
        
}
    
}

}
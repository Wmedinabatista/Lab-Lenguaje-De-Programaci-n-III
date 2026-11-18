package com.sistemacontactos;

import com.sistemacontactos.vista.FormularioContactos;
import javax.swing.SwingUtilities;

public class App {

public static void main(String[] args) {

System.out.println("Iniciando Sistema de Gestion de Contactos...");

BaseDatos.crearTabla();

SwingUtilities.invokeLater(() -> {
FormularioContactos formulario = new FormularioContactos();
formulario.setVisible(true);
        
});

}

}
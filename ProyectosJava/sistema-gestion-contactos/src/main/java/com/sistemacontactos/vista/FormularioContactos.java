package com.sistemacontactos.vista;

import com.sistemacontactos.dao.ContactoDAO;
import com.sistemacontactos.modelo.Contacto;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class FormularioContactos extends JFrame {

private JTextField txtNombre;
private JTextField txtApellido;
private JTextField txtTelefono;
private JTextField txtCorreo;
private JTextField txtDireccion;

private JTable tablaContactos;
private DefaultTableModel modeloTabla;

private ContactoDAO contactoDAO;
private int idSeleccionado = -1;

public FormularioContactos() {

contactoDAO = new ContactoDAO();

setTitle("Sistema de Gestión de Contactos");
setSize(1050, 700);
setMinimumSize(new Dimension(900, 600));
setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
setLocationRelativeTo(null);

crearInterfaz();
cargarContactos();
    
}

private void crearInterfaz() {

JPanel panelPrincipal = new JPanel(new BorderLayout(15, 15));

panelPrincipal.setBorder(
BorderFactory.createEmptyBorder(20, 20, 20, 20)
        
);

// Titulo

JLabel titulo = new JLabel(
"SISTEMA DE GESTIÓN DE CONTACTOS",
SwingConstants.CENTER
        
);

titulo.setFont(new Font("Arial", Font.BOLD, 24));

panelPrincipal.add(titulo, BorderLayout.NORTH);

// Panel del formulario

JPanel panelFormulario = new JPanel(new GridBagLayout());

panelFormulario.setBorder(
BorderFactory.createTitledBorder("Datos del contacto")

);

GridBagConstraints gbc = new GridBagConstraints();

gbc.insets = new Insets(10, 10, 10, 10);
gbc.fill = GridBagConstraints.HORIZONTAL;
gbc.anchor = GridBagConstraints.WEST;

txtNombre = new JTextField(35);
txtApellido = new JTextField(35);
txtTelefono = new JTextField(35);
txtCorreo = new JTextField(35);
txtDireccion = new JTextField(35);

Font fuenteCampos = new Font("Arial", Font.PLAIN, 16);

txtNombre.setFont(fuenteCampos);
txtApellido.setFont(fuenteCampos);
txtTelefono.setFont(fuenteCampos);
txtCorreo.setFont(fuenteCampos);
txtDireccion.setFont(fuenteCampos);

// Crear campos del formulario

agregarCampo(panelFormulario, gbc, 0, "Nombre:", txtNombre);
agregarCampo(panelFormulario, gbc, 1, "Apellido:", txtApellido);
agregarCampo(panelFormulario, gbc, 2, "Teléfono:", txtTelefono);
agregarCampo(panelFormulario, gbc, 3, "Correo:", txtCorreo);
agregarCampo(panelFormulario, gbc, 4, "Dirección:", txtDireccion);

// Botones

JButton btnRegistrar = new JButton("Registrar");
JButton btnActualizar = new JButton("Actualizar");
JButton btnEliminar = new JButton("Eliminar");
JButton btnLimpiar = new JButton("Limpiar");

Font fuenteBotones = new Font("Arial", Font.BOLD, 14);

btnRegistrar.setFont(fuenteBotones);
btnActualizar.setFont(fuenteBotones);
btnEliminar.setFont(fuenteBotones);
btnLimpiar.setFont(fuenteBotones);

JPanel panelBotones = new JPanel(
new FlowLayout(FlowLayout.CENTER, 15, 10)
        
);

panelBotones.add(btnRegistrar);
panelBotones.add(btnActualizar);
panelBotones.add(btnEliminar);
panelBotones.add(btnLimpiar);

// Panel superior

JPanel panelSuperior = new JPanel(new BorderLayout(10, 10));

panelSuperior.add(panelFormulario, BorderLayout.CENTER);
panelSuperior.add(panelBotones, BorderLayout.SOUTH);

panelPrincipal.add(panelSuperior, BorderLayout.NORTH);

// Tabla de contactos

modeloTabla = new DefaultTableModel(
new Object[]{
"ID", "Nombre", "Apellido",
"Teléfono", "Correo", "Dirección"

}, 0
        
) {
@Override
public boolean isCellEditable(int fila, int columna) {
return false;
            
}
        
};

tablaContactos = new JTable(modeloTabla);

tablaContactos.setFont(new Font("Arial", Font.PLAIN, 14));
tablaContactos.setRowHeight(25);

// Centrar los datos de todas las columnas

javax.swing.table.DefaultTableCellRenderer centrado =
new javax.swing.table.DefaultTableCellRenderer();

centrado.setHorizontalAlignment(SwingConstants.CENTER);

for (int i = 0; i < tablaContactos.getColumnCount(); i++) {
tablaContactos.getColumnModel()
.getColumn(i)
.setCellRenderer(centrado);

}

// Centrar los encabezados de las columnas

javax.swing.table.DefaultTableCellRenderer encabezadoCentrado =
new javax.swing.table.DefaultTableCellRenderer();

encabezadoCentrado.setHorizontalAlignment(SwingConstants.CENTER);
encabezadoCentrado.setFont(new Font("Arial", Font.BOLD, 14));

for (int i = 0; i < tablaContactos.getColumnCount(); i++) {
tablaContactos.getColumnModel()
.getColumn(i)
.setHeaderRenderer(encabezadoCentrado);

}

JScrollPane scrollTabla = new JScrollPane(tablaContactos);

JPanel panelTabla = new JPanel(new BorderLayout(5, 5));

JLabel tituloTabla = new JLabel("CONTACTOS REGISTRADOS");
tituloTabla.setFont(new Font("Arial", Font.BOLD, 16));

panelTabla.add(tituloTabla, BorderLayout.NORTH);
panelTabla.add(scrollTabla, BorderLayout.CENTER);

panelPrincipal.add(panelTabla, BorderLayout.CENTER);

add(panelPrincipal);

// Eventos de los botones

btnRegistrar.addActionListener(e -> registrarContacto());

btnActualizar.addActionListener(e -> actualizarContacto());

btnEliminar.addActionListener(e -> eliminarContacto());

btnLimpiar.addActionListener(e -> limpiarCampos());

// Seleccionar contacto de la tabla

tablaContactos.getSelectionModel().addListSelectionListener(e -> {

if (!e.getValueIsAdjusting()) {

int fila = tablaContactos.getSelectedRow();

if (fila >= 0) {

idSeleccionado = Integer.parseInt(
modeloTabla.getValueAt(fila, 0).toString()
                    
);

txtNombre.setText(
modeloTabla.getValueAt(fila, 1).toString()
                    
);

txtApellido.setText(
modeloTabla.getValueAt(fila, 2).toString()
                    
);

txtTelefono.setText(
modeloTabla.getValueAt(fila, 3).toString()
                    
);

txtCorreo.setText(
modeloTabla.getValueAt(fila, 4).toString()
                    
);

txtDireccion.setText(
modeloTabla.getValueAt(fila, 5).toString()
                    
);
                
}
            
}
        
});
    
}

// Metodo para agregar campos al formulario

private void agregarCampo(
JPanel panel,
GridBagConstraints gbc,
int fila,
String etiqueta,
JTextField campo
    
) {

gbc.gridy = fila;

gbc.gridx = 0;
gbc.weightx = 0;

JLabel label = new JLabel(etiqueta);
label.setFont(new Font("Arial", Font.BOLD, 15));

panel.add(label, gbc);

gbc.gridx = 1;
gbc.weightx = 1.0;

campo.setPreferredSize(new Dimension(500, 35));

panel.add(campo, gbc);
    
}

// Registrar contacto

private void registrarContacto() {

if (txtNombre.getText().trim().isEmpty()
|| txtApellido.getText().trim().isEmpty()) {

JOptionPane.showMessageDialog(
this,
"El nombre y el apellido son obligatorios."

);

return;
        
}

Contacto contacto = new Contacto();

contacto.setNombre(txtNombre.getText().trim());
contacto.setApellido(txtApellido.getText().trim());
contacto.setTelefono(txtTelefono.getText().trim());
contacto.setCorreo(txtCorreo.getText().trim());
contacto.setDireccion(txtDireccion.getText().trim());

if (contactoDAO.registrar(contacto)) {

JOptionPane.showMessageDialog(
this,
"Contacto registrado correctamente."
            
);

cargarContactos();
limpiarCampos();

} else {

JOptionPane.showMessageDialog(
this,
"Error al registrar el contacto."
            
);
        
}
    
}

// Consultar contactos

private void cargarContactos() {

modeloTabla.setRowCount(0);

List<Contacto> contactos = contactoDAO.listar();

for (Contacto contacto : contactos) {

modeloTabla.addRow(new Object[]{
contacto.getId(),
contacto.getNombre(),
contacto.getApellido(),
contacto.getTelefono(),
contacto.getCorreo(),
contacto.getDireccion()
            
});
        
}
    
}

// Actualizar contacto

private void actualizarContacto() {

if (idSeleccionado == -1) {

JOptionPane.showMessageDialog(
this,
"Seleccione un contacto de la tabla."
            
);

return;
        
}

if (txtNombre.getText().trim().isEmpty()
|| txtApellido.getText().trim().isEmpty()) {

JOptionPane.showMessageDialog(
this,
"El nombre y el apellido son obligatorios."
            
);

return;
        
}

Contacto contacto = new Contacto();

contacto.setId(idSeleccionado);
contacto.setNombre(txtNombre.getText().trim());
contacto.setApellido(txtApellido.getText().trim());
contacto.setTelefono(txtTelefono.getText().trim());
contacto.setCorreo(txtCorreo.getText().trim());
contacto.setDireccion(txtDireccion.getText().trim());

if (contactoDAO.actualizar(contacto)) {

JOptionPane.showMessageDialog(
this,
"Contacto actualizado correctamente."
            
);

cargarContactos();
limpiarCampos();

} else {

JOptionPane.showMessageDialog(
this,
"Error al actualizar el contacto."
            
);
        
}
    
}

// Eliminar contacto

private void eliminarContacto() {

if (idSeleccionado == -1) {

JOptionPane.showMessageDialog(
this,
"Seleccione un contacto de la tabla."
            
);

return;
        
}

int respuesta = JOptionPane.showConfirmDialog(
this,
"¿Está seguro de eliminar este contacto?",
"Confirmar eliminación",
JOptionPane.YES_NO_OPTION
        
);

if (respuesta == JOptionPane.YES_OPTION) {

if (contactoDAO.eliminar(idSeleccionado)) {

JOptionPane.showMessageDialog(
this,
"Contacto eliminado correctamente."
                
);

cargarContactos();
limpiarCampos();

} else {

JOptionPane.showMessageDialog(
this,
"Error al eliminar el contacto."
                
);
            
}
        
}
    
}

// Limpiar campos

private void limpiarCampos() {

txtNombre.setText("");
txtApellido.setText("");
txtTelefono.setText("");
txtCorreo.setText("");
txtDireccion.setText("");

idSeleccionado = -1;

tablaContactos.clearSelection();
    
}

}
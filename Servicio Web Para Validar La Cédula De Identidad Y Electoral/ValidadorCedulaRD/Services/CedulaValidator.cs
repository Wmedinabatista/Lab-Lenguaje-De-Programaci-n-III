namespace ValidadorCedulaRD.Services

{

public class CedulaValidator
    
{
        
public bool ValidarCedula(string cedula)
        
{
            
// Eliminar guiones y espacios
cedula = cedula.Replace("-", "").Trim();

// Comprobar que tenga exactamente 11 dígitos
if (cedula.Length != 11 ||
!cedula.All(char.IsDigit))
            
{
                
return false;
            
}

int suma = 0;

// Recorrer los primeros 10 dígitos
for (int i = 0; i < 10; i++)
            
{
                
int digito = int.Parse(cedula[i].ToString());

// Multiplicar alternadamente por 1 y 2
int multiplicador = (i % 2 == 0) ? 1 : 2;

int resultado = digito * multiplicador;

// Sumar los dígitos del resultado
if (resultado > 9)
                
{

resultado = (resultado / 10) +
(resultado % 10);
                
}

suma += resultado;
            
}

// Calcular el dígito verificador
int digitoEsperado = (10 - (suma % 10)) % 10;

// Comparar con el último dígito
int digitoReal = int.Parse(cedula[10].ToString());

return digitoEsperado == digitoReal;
        
}
    
}

}
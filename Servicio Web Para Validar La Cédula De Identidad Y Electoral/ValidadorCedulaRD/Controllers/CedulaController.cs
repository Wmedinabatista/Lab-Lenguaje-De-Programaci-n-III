using Microsoft.AspNetCore.Mvc;
using ValidadorCedulaRD.Services;

namespace ValidadorCedulaRD.Controllers

{

[ApiController]
[Route("api/[controller]")]
public class CedulaController : ControllerBase
    
{
        
private readonly CedulaValidator _validator;

public CedulaController(CedulaValidator validator)
        
{
            
_validator = validator;
        
}

[HttpPost("validar")]
public IActionResult Validar([FromBody] CedulaRequest solicitud)
        
{
            
bool esValida = _validator.ValidarCedula(solicitud.Cedula);

return Ok(new
            
{

cedula = solicitud.Cedula,
valida = esValida,
mensaje = esValida
? "La cédula es válida."
: "La cédula es inválida."
            
});
        
}
    
}

public class CedulaRequest
    
{
        
public string Cedula { get; set; } = string.Empty;
    
}

}
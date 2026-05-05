package com.proyecto.eventos_utp.controller;

import com.proyecto.eventos_utp.DTO.UsuarioDTO;
import com.proyecto.eventos_utp.model.Usuario;
import com.proyecto.eventos_utp.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
        "http://localhost:5501",
        "http://127.0.0.1:5501"
})
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository repo;

    public UsuarioController(UsuarioRepository repo) {
        this.repo = repo;
    }
    @PostMapping
    public ResponseEntity<Usuario> registrar(@RequestBody UsuarioDTO dto){
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setContrasenia(dto.getContrasenia());
        Usuario guardado = repo.save(usuario);
        return ResponseEntity.ok(guardado);
    }

}

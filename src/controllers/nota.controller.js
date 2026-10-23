import { CrearNotaDTO } from '../dtos/crear-nota.dto.js';
import { ActualizarNotaDTO } from '../dtos/actualizar-nota.dto.js';
import { notaService } from '../services/nota.service.js';

export async function crearNota(req, res, next){
    try{
        const datos = new CrearNotaDTO(req.body);
        const nota = await notaService.crear(datos);
        res.cookie('ultimaCategoria', nota.categoria, {
            httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60
        });

        res.status(201).json({ data: nota })
    }catch(err){

    }
}
// export async function crearNota(req, res, next){
//     try{
//         const datos = new CrearNotaDTO(req.body);
//         const nota = await notaService.crear(datos);
//         res.status(201).json({ data: nota });
//     }catch(err){
//         next(err);
//     }
// }

export async function obtenerNotas(req, res, next){
    try{
        const notas = await notaService.listar();
        res.status(201).json({ data: notas });
    }catch(err){
        next(err);
    }
}

export async function obtenerNota(req, res, next){
    try{
        const nota = await notaService.buscarPorId(req.params.id);
        if(!nota) return res.status(404).json({ error: 'Nota no encontrada' });
        res.status(201).json({ data: nota });
    }catch(err){
        next(err);
    }
}

export async function actualizarNota(req, res, next){
    try{
        const datos = new ActualizarNotaDTO(req.body);
        const nota = await notaService.actualizar(req.params.id, datos);
        if(!nota) return res.status(404).json({ error: 'Nota no encontrada '});
        res.status(200).json({ data: nota})
    }catch(err){
        next(err)
    }
}

export async function eliminarNota(req, res, next){
    try{
        const nota = await notaService.eliminar(req.params.id);
        if(!nota) return res.status(404).json({ error: 'Nota no encontrada' });
        res.status(204).send();
    }catch(err){
        next(err);
    }
}
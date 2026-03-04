const jwt= require('jsonwebtoken');

module.exports= (req, res, next)=>{
    console.log('aqui');
    const token= req.header('Authorization');
    if(!token) return res.status(401).json({msg: 'Acceso denegado. Token requierido'});
    try{
        const tokenLimpio= token.replace("Bearer ", "");
        console.log(tokenLimpio);
        const decoded= jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.usuario= decoded;
        console.log('Se verifico');
        next();
    }catch(e){
        console.log('Error'+ e);
        res.status(401).json({msg: 'Token no valido o expirado'})
    }
}
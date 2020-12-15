const express = require('express')
const uuid =  require('uuid')
const router = express.Router()
const members = require('../../members')

// gets all members
router.get('/', (req, res) => {
    res.json(members)
})

// get single member 
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg : `no members with the id = ${req.params.id}`})
    }
})

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        nama : req.body.nama,
        pekerjaan : req.body.pekerjaan
    }

    if(!newMember.nama || !newMember.pekerjaan){
        return res.status(400).json({msg : "tolong masukkan nama dan pekerjaan"})
    }

    members.push(newMember)
    res.json(members)
})

// update members 
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        const updMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.nama = updMember.nama ? updMember.nama : member.nama
                member.pekerjaan = updMember.pekerjaan ? updMember.pekerjaan : member.pekerjaan
            }
        })
    }else{
        res.status(400).json({msg : `no members with the id = ${req.params.id}`})
    }
})

// Delete members
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json({msg : 'member deleted', members : members.filter(member => member.id === parseInt(req.params.id))})
    }else{
        res.status(400).json({msg : `no members with the id = ${req.params.id}`})
    }
})

module.exports = router
const Employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req,res)=>{
    const employees = await Employee.find();
    res.json(employees);
};

employeeCtrl.createEmployee = async (req,res)=>{   
    const employee = new Employee(req.body);
    await employee.save();
    res.json({
        'status':'Guardado Correctamente'
    });
};

employeeCtrl.getEmployee =  async (req,res)=>{   
    const employee = await Employee.findById(req.params.id);
    employee
        .then(db => res.json({
            db
        }))
        .catch(err => res.json({
            err
        }));
};


employeeCtrl.editeEmployee = async (req,res)=>{
    var employee = {
        name:req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    };
    await Employee.findByIdAndUpdate(req.params.id,{$set: employee})
        .then(db =>res.json({
            "status":"Actualizados"
        }))
        .catch(err => res.json({
            "status": err
        }));
}

employeeCtrl.deleteEmployee = async (req,res)=>{
    await Employee.findByIdAndRemove(req.params.id)
        .then(db =>res.json({
            "status":"Eliminado"
        }))
        .catch(err => res.json({
            "status": err
        }));
};

module.exports = employeeCtrl;
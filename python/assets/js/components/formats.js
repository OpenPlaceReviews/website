var format = {
    getIconIter(op)
    {
        if (op.type == 'sys.signup') return 'ic_user_signup';
        else if (op.type == 'sys.login') return 'ic_user_login';
        else if (op.type == 'sys.grant') return 'ic_permission';
        else if (op.type == 'sys.operation') return 'ic_object';
        else if (op.type == 'sys.validate') return 'ic_validation';
        else if (op.type == 'sys.role') return 'ic_user_info';
        else return 'ic_object';
    },
    getOperationName(op) {
        if (op.type == 'sys.signup') return 'Signup'
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Login';
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit Profile';
        else if (op.type == 'sys.login' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Logout';
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add permission';
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit permission';
        else if (op.type == 'sys.grant' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete permission';
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add object';
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit object';
        else if (op.type == 'sys.operation' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete object';
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add validator';
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit validator';
        else if (op.type == 'sys.validate' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete validator';
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add role';
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit role';
        else if (op.type == 'sys.role' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete role';
        else return op.type;
    },
    getOperationTitle(op){
        if (op.type == 'sys.signup') return 'Welcome new user ' + op.new[0].id
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'User ' + op.new[0].id + ' has came website';
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'User ' + op.new[0].id + ' update details';
        else if (op.type == 'sys.login' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'User ' + op.new[0].id + ' has left website';
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add permission ' + op.new[0].id;
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit permission ' + op.new[0].id;
        else if (op.type == 'sys.grant' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete permission ' + op.new[0].id;
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add object ' + op.new[0].id;
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit object ' + op.new[0].id;
        else if (op.type == 'sys.operation' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete object ' + op.new[0].id;
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add validator ' + op.new[0].id;
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit validator ' + op.new[0].id;
        else if (op.type == 'sys.validate' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete validator ' + op.new[0].id;
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add role ' + op.new[0].id;
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit role ' + op.new[0].id;
        else if (op.type == 'sys.role' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete role ' + op.new[0].id;
        else return op.type;
    },
    getOperationDescription(op){
        if (op.type == 'sys.signup') return 'User ' + op.new[0].id + ' details: ' + JSON.stringify(op.new[0].details);
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'User ' + op.new[0].id + ' has came website';
        else if (op.type == 'sys.login' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'User ' + op.new[0].id + ' update details';
        else if (op.type == 'sys.login' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'User ' + op.new[0].id + ' has left website';
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add permission ' + op.new[0].id;
        else if (op.type == 'sys.grant' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit permission ' + op.new[0].id;
        else if (op.type == 'sys.grant' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete permission ' + op.new[0].id;
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add object ' + op.new[0].id;
        else if (op.type == 'sys.operation' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit object ' + op.new[0].id;
        else if (op.type == 'sys.operation' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete object ' + op.new[0].id;
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add validator ' + op.new[0].id;
        else if (op.type == 'sys.validate' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit validator ' + op.new[0].id;
        else if (op.type == 'sys.validate' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete validator ' + op.new[0].id;
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && (!op.old || !op.old.length == 0)) return 'Add role ' + op.new[0].id;
        else if (op.type == 'sys.role' && op.new && op.new.length > 0 && op.old && op.old.length > 0) return 'Edit role ' + op.new[0].id;
        else if (op.type == 'sys.role' && (!op.new || op.new.length == 0) && op.old && op.old.length > 0) return 'Delete role ' + op.new[0].id;
        else return op.type;
    },
    getObjectName(op){
        if (op.type == 'sys.signup') return 'User signup'
        else if (op.type == 'sys.login') return 'User login';
        else if (op.type == 'sys.grant') return 'Permission';
        else if (op.type == 'sys.operation') return 'Object type';
        else if (op.type == 'sys.validate') return 'Validation rule';
        else if (op.type == 'sys.role') return 'User role';
        else return op.type;
    },
    getObjectTitle(obj){
        if (obj.type == 'sys.signup') return 'User ' + obj.id
        else if (obj.type == 'sys.login') return 'User login ' + obj.id;
        else if (obj.type == 'sys.grant') return 'Permission ' + obj.id;
        else if (obj.type == 'sys.operation') return 'Object type ' + obj.id;
        else if (obj.type == 'sys.validate') return 'Validator ' + obj.id;
        else if (obj.type == 'sys.role') return 'User role ' + obj.id;
        else return obj.type;
    },
    getObjectDescription(obj){
        if (obj.comment && obj.comment.length > 0) return obj.comment;
        else if (obj.type == 'sys.signup') return 'Signup new user as  ' + obj.id;
        else if (obj.type == 'sys.login') return 'User login as ' + obj.id;
        else if (obj.type == 'sys.grant') return 'Information grant permission ' + obj.id;
        else if (obj.type == 'sys.operation') return 'Object type ' + obj.id;
        else if (obj.type == 'sys.validate') return 'Validator ' + obj.id;
        else if (obj.type == 'sys.role') return 'User role ' + obj.id;
        else return '';
    },
    getTypePluralName(id){
        if (id == 'sys.signup') return 'User signups'
        else if (id == 'sys.login') return 'User logins';
        else if (id == 'sys.grant') return 'Permissions';
        else if (id == 'sys.operation') return 'Objects types';
        else if (id == 'sys.validate') return 'Validation rules';
        else if (id == 'sys.role') return 'User roles';
        else return op.type;
    }
};

export default format
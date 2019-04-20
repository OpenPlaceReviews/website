var format = {
    getIconIter(obj)
    {
        if (obj.type == 'sys.signup') return 'ic_user_signup';
        else if (obj.type == 'sys.login') return 'ic_user_login';
        else if (obj.type == 'sys.grant') return 'ic_permission';
        else if (obj.type == 'sys.operation') return 'ic_object';
        else if (obj.type == 'sys.validate') return 'ic_validation';
        else if (obj.type == 'sys.role') return 'ic_user_info';
        else return 'ic_object';
    },
    getOperationName(obj) {
        if (obj.type == 'sys.signup') return 'Signup'
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Login';
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit Profile';
        else if (obj.type == 'sys.login' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Logout';
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add permission';
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit permission';
        else if (obj.type == 'sys.grant' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete permission';
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add object';
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit object';
        else if (obj.type == 'sys.operation' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete object';
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add validator';
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit validator';
        else if (obj.type == 'sys.validate' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete validator';
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add role';
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit role';
        else if (obj.type == 'sys.role' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete role';
        else return obj.type;
    },
    getOperationTitle(obj){
        if (obj.type == 'sys.signup') return 'Welcome new user ' + obj.new[0].id
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'User ' + obj.new[0].id + ' has came website';
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'User ' + obj.new[0].id + ' update details';
        else if (obj.type == 'sys.login' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'User ' + obj.new[0].id + ' has left website';
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add permission ' + obj.new[0].id;
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit permission ' + obj.new[0].id;
        else if (obj.type == 'sys.grant' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete permission ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add object ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit object ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete object ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add validator ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit validator ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete validator ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add role ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit role ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete role ' + obj.new[0].id;
        else return obj.type;
    },
    getOperationsDescription(obj){
        if (obj.type == 'sys.signup') return 'User ' + obj.new[0].id + ' details: ' + JSON.stringify(obj.new[0].details);
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'User ' + obj.new[0].id + ' has came website';
        else if (obj.type == 'sys.login' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'User ' + obj.new[0].id + ' update details';
        else if (obj.type == 'sys.login' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'User ' + obj.new[0].id + ' has left website';
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add permission ' + obj.new[0].id;
        else if (obj.type == 'sys.grant' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit permission ' + obj.new[0].id;
        else if (obj.type == 'sys.grant' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete permission ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add object ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit object ' + obj.new[0].id;
        else if (obj.type == 'sys.operation' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete object ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add validator ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit validator ' + obj.new[0].id;
        else if (obj.type == 'sys.validate' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete validator ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && (!obj.old || !obj.old.length == 0)) return 'Add role ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && obj.new && obj.new.length > 0 && obj.old && obj.old.length > 0) return 'Edit role ' + obj.new[0].id;
        else if (obj.type == 'sys.role' && (!obj.new || obj.new.length == 0) && obj.old && obj.old.length > 0) return 'Delete role ' + obj.new[0].id;
        else return obj.type;
    },
    getObjectName(obj){
        if (obj.type == 'sys.signup') return 'User signup'
        else if (obj.type == 'sys.login') return 'User login';
        else if (obj.type == 'sys.grant') return 'Permission';
        else if (obj.type == 'sys.operation') return 'Object';
        else if (obj.type == 'sys.validate') return 'Validator';
        else if (obj.type == 'sys.role') return 'Role';
        else return obj.type;
    }
};

// getObjectDescription(var obj)
//
// getObjectName(var obj)
//
// getTypePluralName(var id)
export default format
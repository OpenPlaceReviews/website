var format = {
    getIconIter(op) {
        if (op.type == 'sys.signup') return 'ic_user_signup';
        else if (op.type == 'sys.login') return 'ic_user_login';
        else if (op.type == 'sys.grant') return 'ic_permission';
        else if (op.type == 'sys.operation') return 'ic_object';
        else if (op.type == 'sys.validate') return 'ic_validation';
        else if (op.type == 'sys.role') return 'ic_user_info';
        else return 'ic_object';
    },
    
    
    getOperationTitle(op){
        if (op.new && op.new.length > 0 && op.old && op.old.length > 0) {
            return "Edit " + format.getObjectName(op.type) + " " + format.jsonToString(op.new[0].id);
        } else if (op.old && op.old.length > 0) {
            return "Delete  " + format.getObjectName(op.type) + " " + format.jsonToString(op.old[0].id);
        } else if (op.new && op.new.length > 0) {
            return "New  " + format.getObjectName(op.type) + " " + format.jsonToString(op.new[0].id);
        }
        return "Empty operation " + format.getObjectName(op.type);
    },
    
    getOperationName(op){
        return format.getOperationTitle(op);
    },
   
    jsonToString(o) {
       if(typeof o == 'string') {
            return "'" + o + "'";
       }
       if(o.length == 1) {
            return "'" + o[0] + "'";
       }
       return JSON.stringify(o);
    },
    
    getOperationDescription(op){
        return "";
    },
    
    getObjectName(obj){
        if (obj.type == 'sys.signup') return 'User signup'
        else if (obj.type == 'sys.login') return 'User login';
        else if (obj.type == 'sys.grant') return 'Permission';
        else if (obj.type == 'sys.operation') return 'Object type';
        else if (obj.type == 'sys.validate') return 'Validation rule';
        else if (obj.type == 'sys.role') return 'User role';
        else return obj.type;
    },
    getTypePluralName(id){
        if (id == 'sys.signup') return 'User signups'
        else if (id == 'sys.login') return 'User logins';
        else if (id == 'sys.grant') return 'Permissions';
        else if (id == 'sys.operation') return 'Objects types';
        else if (id == 'sys.validate') return 'Validation rules';
        else if (id == 'sys.role') return 'User roles';
        else return op.type;
    },
    
    getObjectTitle(obj){
        return format.getObjectName(obj) + ' ' + format.jsonToString(obj.id);
    },
    
    getObjectDescription(obj){
        if (obj.comment && obj.comment.length > 0) return obj.comment;
        var op = { new : [obj], type : obj.type};
        return format.getOperationTitle(op);
    }

};

export default format

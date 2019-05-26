export default {
    methods:{
        jsonToString(o) {
            if(typeof o == 'string') {
                return "'" + o + "'";
            }
            if(o.length == 1) {
                return "'" + o[0] + "'";
            }
            return JSON.stringify(o);
        },
        getIconOperation: function(op) {
            var custom_op_type = op.type.replace('.', '_');
            if (FormatsOPR[custom_op_type].hasOwnProperty('operationIcon')) {
                return FormatsOPR[custom_op_type].operationIcon.split(':').reverse()[0];
            }
            else if (op.type == 'sys.signup') return 'ic_user_signup';
            else if (op.type == 'sys.login') return 'ic_user_login';
            else if (op.type == 'sys.grant') return 'ic_permission';
            else if (op.type == 'sys.operation') return 'ic_object';
            else if (op.type == 'sys.validate') return 'ic_validation';
            else if (op.type == 'sys.role') return 'ic_user_info';
            else return 'ic_object';
        },
        getIconObject: function(obj) {
            var custom_obj_type = obj.type.replace('.', '_');
            if (FormatsOPR[custom_obj_type].hasOwnProperty('objectIcon')) {
                return FormatsOPR[custom_obj_type].operationIcon.split(':').reverse()[0];
            }
            else if (obj.type == 'sys.signup') return 'ic_user_signup';
            else if (obj.type == 'sys.login') return 'ic_user_login';
            else if (obj.type == 'sys.grant') return 'ic_permission';
            else if (obj.type == 'sys.operation') return 'ic_object';
            else if (obj.type == 'sys.validate') return 'ic_validation';
            else if (obj.type == 'sys.role') return 'ic_user_info';
            else return 'ic_object';
        },
        getObjectName: function(obj){
            return this.getName(obj.type)
        },
        getName: function (id) {
            var custom_id = id.replace('.', '_');
            if (FormatsOPR[custom_id].hasOwnProperty('name')){
                return FormatsOPR[custom_id].name;
            }
            else if (id == 'sys.signup') return 'User';
            else if (id == 'sys.login') return 'User login';
            else if (id == 'sys.grant') return 'Permission';
            else if (id == 'sys.operation') return 'Object type';
            else if (id == 'sys.validate') return 'Validation rule';
            else if (id == 'sys.role') return 'User role';
            else return id;
        },
        getPluralName: function(id) {
            var custom_id = id.replace('.', '_');
            if (FormatsOPR[custom_id].hasOwnProperty('pluralName')) return FormatsOPR[custom_id].pluralName;
            else if (id == 'sys.signup') return 'User signups';
            else if (id == 'sys.login') return 'User logins';
            else if (id == 'sys.grant') return 'Permissions';
            else if (id == 'sys.operation') return 'Objects types';
            else if (id == 'sys.validate') return 'Validation rules';
            else if (id == 'sys.role') return 'User roles';
            else return op.type;
        },
        getObjectTitle: function(obj){
            var custom_type = obj.type.replace('.', '_');
            if (FormatsOPR[custom_type].hasOwnProperty('objectNameFormat')){
                return FormatsOPR[custom_type].objectNameFormat(obj);
            }
            else if (obj.type == 'sys.signup') return 'User signup';
            else if (obj.type == 'sys.login') return 'User login';
            else if (obj.type == 'sys.grant') return 'Permission';
            else if (obj.type == 'sys.operation') return 'Object type';
            else if (obj.type == 'sys.validate') return 'Validation rule';
            else if (obj.type == 'sys.role') return 'User role';
            else return obj.type;
        },
        getObjectDescription: function(obj) {
            var custom_type = obj.type.replace('.', '_');
            if (FormatsOPR[custom_type].hasOwnProperty('objectDescriptionFormat')){
                return FormatsOPR[custom_type].objectDescriptionFormat(obj);
            }
            if (obj.comment && obj.comment.length > 0) return obj.comment;
            var op = { new : [obj], type : obj.type};
            return this.getOperationTitle(op);
        },
        getOperationName: function(op) {
            var custom_op_type = op.type.replace('.', '_');
            if (FormatsOPR[custom_op_type].hasOwnProperty('operationFormat')) {
                return FormatsOPR[custom_op_type].operationFormat(op);
            }
            else if (op.new && op.new.length > 0 && op.old && op.old.length > 0) {
                return "Edit " + this.getObjectName(op) + " " + this.jsonToString(op.new[0].id);
            } else if (op.old && op.old.length > 0) {
                return "Delete " + this.getObjectName(op) + " " + this.jsonToString(op.old[0].id);
            } else if (op.new && op.new.length > 0) {
                return "New " + this.getObjectName(op) + " " + this.jsonToString(op.new[0].id);
            }
            return "Empty operation " + this.getObjectName(op);
        },
        getOperationTitle(op){
            return this.getOperationName(op);
        },
        getOperationDescription(op){
            return "";
        },

    }
}
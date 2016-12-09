var HT = require( '../../hornbill-template' )()

module.exports = {
    name   : 'hornbill-template',
    ext    : 'hd',
    render : function ( template, data, callback ) {
        var output = template( data )
        callback( null, output )
    },
    load   : function ( src, templatePath, templateName, callback ) {
        var template = HT.compile( src )
        callback( null, template )
    },
    compile: function ( src, templatePath, templateName, callback ) {
        var precompiled = HT.preCompile( templatePath, {
            isFile: true
        } )

        var compiled = precompiled
        callback( null, compiled )
    }
}

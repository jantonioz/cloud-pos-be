const graphql = require('graphql')
const Producto = require('../models/producto.model')
const Usuario = require('../models/usuario.model')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql

const ProductoType = new GraphQLObjectType({
  name: 'Producto',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    precio: {
      type: GraphQLFloat
    },
    peso: {
      type: GraphQLFloat
    }
  })
})

const UsuarioType = new GraphQLObjectType({
  name: 'Usuario',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    nombre: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    lastLogin: {
      type: GraphQLString
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    producto: {
      type: ProductoType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(paremt, args) {
        return Producto.findById(args.id)
      }
    },
    productos: {
      type: ProductoType,
      resolve(parent, args) {
        return Producto.find({})
      }
    },
    usuario: {
      type: UsuarioType,
      args: {
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        const usuarios = Usuario.find()
        return Usuario.find({ username: args.username, password: args.password })
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProducto: {
      type: ProductoType,
      args: {
        nombre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        precio: {
          type: new GraphQLNonNull(GraphQLFloat)
        },
        peso: {
          type: new GraphQLNonNull(GraphQLFloat)
        }
      },
      resolve(parent, args) {
        const producto = new Producto({
          name: args.name,
          precio: args.precio,
          peso: args.peso,
        })
        return producto.save()
      }
    },
    addUsuario: {
      type: UsuarioType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        },
        nombre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastLogin: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        const usuario = new Usuario({
          username: args.username,
          password: args.password,
          nombre: args.nombre,
          lastLogin: args.lastLogin
        })
        usuario.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
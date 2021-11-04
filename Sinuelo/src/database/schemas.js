export const SupportedTypes = {
  INTEGER: {
      value: 'INTEGER',
      type: 'INTEGER',
      default_value: null
  },
  LONG: {
      value: 'LONG',
      type: 'INTEGER',
      default_value: null
  },
  DOUBLE: {
      value: 'DOUBLE',
      type: 'REAL',
      default_value: null
  },
  TEXT: {
      value: 'TEXT',
      type: 'TEXT',
      default_value: null
  },
  BOOLEAN: {
      value: 'BOOLEAN',
      type: 'INTEGER',
      default_value: null
  },
  DATETIME: {
      value: 'DATETIME',
      type: 'TEXT',
      default_value: null
  },
  SYNC_STATUS: {
      value: 'STATUS',
      type: 'TEXT',
      default_value: null
  },
  JSON: {
      value: 'JSON',
      type: 'TEXT',
      default_value: null
  },
  DATE: {
    value: 'DATE',
    type: 'DATE',
    default_value: null
  },
  TIME: {
    value: 'TIME',
    type: 'TIME',
    default_value: null
  },
};

export const Tables = {  
  ANIMAIS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    NOME: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    },
    BRINCO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }
  },

  ALERTAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    DESCRICAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }
  },

  BRINCOS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false,
    },
    CODIGO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }, 
  }, 

  DOENCAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    DESCRICAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }
  },

  MEDICAMENTOS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    DESCRICAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }
  },

  VACINAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
    },
    DESCRICAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    }
  }, 

  //Tabelas de histórico 
  HISTORICO_ALERTAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
      auto_increment: true,
    },
    ID_ALERTA: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    DATA: {
      type: SupportedTypes.DATE,
      primary_key: false, 
    },
    HORA: {
      type: SupportedTypes.TIME,
      primary_key: false, 
    } 
  },
  HISTORICO_PESAGENS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
      auto_increment: true,
    }, 
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    PESO: {
      type: SupportedTypes.DOUBLE,
      primary_key: false, 
    },
    OBSERVACAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    },
    DATA: {
      type: SupportedTypes.DATE,
      primary_key: false, 
    },
    HORA: {
      type: SupportedTypes.TIME,
      primary_key: false, 
    } 
  },
  HISTORICO_VACINAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
      auto_increment: true,
    }, 
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    ID_VACINA: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    OBSERVACAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    },
    DATA: {
      type: SupportedTypes.DATE,
      primary_key: false, 
    },
    HORA: {
      type: SupportedTypes.TIME,
      primary_key: false, 
    } 
  },
  HISTORICO_DOENCAS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
      auto_increment: true,
    }, 
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    ID_DOENCA: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    OBSERVACAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    },
    DATA: {
      type: SupportedTypes.DATE,
      primary_key: false, 
    },
    HORA: {
      type: SupportedTypes.TIME,
      primary_key: false, 
    } 
  },
  HISTORICO_MEDICAMENTOS: {
    ID: {
      type: SupportedTypes.INTEGER,
      primary_key: true,
      auto_increment: true,
    }, 
    ID_ANIMAL: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    ID_MEDICAMENTO: {
      type: SupportedTypes.INTEGER,
      primary_key: false, 
    },
    OBSERVACAO: {
      type: SupportedTypes.TEXT,
      primary_key: false, 
    },
    DATA: {
      type: SupportedTypes.DATE,
      primary_key: false, 
    },
    HORA: {
      type: SupportedTypes.TIME,
      primary_key: false, 
    } 
  }
};
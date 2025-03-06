

export const ordersInclude = {
    ordersItems: {
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            discountPercentage: true,
            thumbnail: true,
            inventories: true 
          }
        } 
      }
    },
    user: {
      select: {
        id: true,
        fullName: true,
        email: true 
      }
    }
  }
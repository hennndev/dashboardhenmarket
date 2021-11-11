import Swal from 'sweetalert2'
import { handleProducts, handleEmployees } from '../reducers/appReducer'
import { auth, db, storage, timestamp } from '../../firebase/firebaseConfig'



export const  addProduct = (data, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Adding new product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Adding now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            storage.ref(`/imagesProduct/${data.productImage?.name}`)
                .put(data.productImage)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        db.collection('products').add({
                            ...data,
                            productImage: url,
                            productImageName: data.productImage.name,
                            timestamp: timestamp(),
                        })
                        setIsLoading(false)
                        Swal.fire(
                            'New Product has been added',
                            'success'
                        )
                        handleBack()
                    })
                })
        }
    })
}
export const getProducts = () => {
    return dispatch => {
        db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const updateProducts = []
            snapshot.forEach(snap => {
                updateProducts.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            dispatch(handleProducts(updateProducts))
        })
    }
}
export const deleteProduct = (id, imageUrl) => {
    Swal.fire({
        title: 'Delete product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete now!'
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection('products')
                .doc(id)
                .delete().then(() => {                
                    storage.refFromURL(imageUrl).delete()
                    Swal.fire(
                        'Product has been deleted',
                        'success'
                    )
            })
        }
    })
}
export const editProduct = (oldData, newData, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Update product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            if(typeof newData.productImage === 'string') {
                db.collection('products').doc(oldData.id).update({
                    ...newData,
                    productImageName: oldData.productImageName,
                    timestamp: oldData.timestamp
                }).then(() => {
                    setIsLoading(false)
                    Swal.fire(
                        'New Product has been added',
                        'success'
                    )
                    handleBack()
                })
            } else {
                storage.ref(`/imagesProduct/${newData.productImage?.name}`)
                .put(newData.productImage)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        db.collection('products').doc(oldData.id).update({
                            ...newData,
                            productImage: url,
                            productImageName: newData.productImage.name,
                            timestamp: timestamp(),
                        }).then(() => {
                            storage.refFromURL(oldData.productImage).delete()
                            setIsLoading(false)
                            Swal.fire(
                                'New Product has been added',
                                'success'
                            )
                            handleBack()
                        })    
                    })
                })
            }
        }
    })
}






export const addEmployee = (data, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Adding new employee?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Adding now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            storage.ref(`imagesEmployees/${data.employeeImage?.name}`)
                .put(data.employeeImage)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        db.collection('employees').add({
                            ...data,
                            employeeImage: url,
                            employeeImageName: data.employeeImage.name,
                            timestamp: timestamp(),
                        }).then(() => {
                            setIsLoading(false)
                            Swal.fire(
                                'New Employee has been added',
                                'success'
                            )
                            handleBack()
                        })   
                    })
                }).catch(() => {
                    setIsLoading(false)
                })
        }
    })
}


export const getEmployees = () => {
    return dispatch => {
        db.collection('employees').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const updateEmployees = []
            snapshot.forEach(snap => {
                updateEmployees.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            dispatch(handleEmployees(updateEmployees))
        })
    }
}

export const deleteEmployee = (id, imageUrl) => {
    Swal.fire({
        title: 'Delete product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete now!'
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection('employees').doc(id).delete().then(() => {
                Swal.fire(
                    'Product has been deleted',
                    'success'
                )
                storage.refFromURL(imageUrl).delete()
            })
        }
      })
}
export const editEmployee = (oldData, newData, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Update employee?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            if(typeof newData.productImage === 'string') {
                db.collection('products').doc(oldData.id).update({
                    ...newData,
                    productImageName: oldData.productImageName,
                    timestamp: oldData.timestamp
                }).then(() => {
                    setIsLoading(false)
                    Swal.fire(
                        'New Product has been added',
                        'success'
                    )
                    handleBack()
                })
            } else {
                storage.ref(`/imagesProduct/${newData.productImage?.name}`)
                .put(newData.productImage)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        db.collection('products').doc(oldData.id).update({
                            ...newData,
                            productImage: url,
                            productImageName: newData.productImage.name,
                            timestamp: timestamp(),
                        }).then(() => {
                            storage.refFromURL(oldData.productImage).delete()
                            setIsLoading(false)
                            Swal.fire(
                                'New Product has been added',
                                'success'
                            )
                            handleBack()
                        })    
                    })
                })
            }
        }
    })
}


export const addTransaction = (data) => {
    db.collection('transactions').add({
        ...data,
        timestamp: timestamp()
    })
}


export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

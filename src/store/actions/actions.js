import Swal from 'sweetalert2'
import { handleProducts, handleEmployees, handleTransactions, handleMembers } from '../reducers/appReducer'
import { auth, db, storage, timestamp } from '../../firebase/firebaseConfig'



const getData = (coll, handleData) => {
    return dispatch => {
        db.collection(coll).orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const updateData = []
            
            snapshot.forEach(snap => {
                updateData.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            dispatch(handleData(updateData))
        })
    }
}
const deleteData = (coll, id, imageURL = null) => {
    Swal.fire({
        title: `Delete ${coll.slice(0, coll.length - 1).toLowerCase()}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Delete now!'
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection(coll.toLowerCase()).doc(id).delete().then(() => {                  
                if(imageURL) storage.refFromURL(imageURL).delete()
            })
            Swal.fire(
                `${coll.slice(0, coll.length - 1)} has been deleted`,
                'success'
            )
        }
    })
}












// PRODUCTS
export const  addProduct = (data, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Adding new product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
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

export const getProducts = () => getData('products', handleProducts)
export const deleteProduct = (data) => deleteData('Products', data.id, data.productImage)
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




// EMPLOYEES
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
export const getEmployees = () => getData('employees', handleEmployees)
export const deleteEmployee = (data) => deleteData('Employees', data.id, data.employeeImage )
export const editEmployee = (oldData, newData, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Update employee?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Update now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            if(typeof newData.employeeImage === 'string') {
                db.collection('employees').doc(oldData.id).update({
                    ...newData,
                    productImageName: oldData.employeeImageName,
                    timestamp: oldData.timestamp
                }).then(() => {
                    setIsLoading(false)
                    Swal.fire(
                        'Employee has been updated',
                        'success'
                    )
                    handleBack()
                })
            } else {
                storage.ref(`/imagesEmployees/${newData.employeeImage?.name}`)
                .put(newData.employeeImage)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        db.collection('employees').doc(oldData.id).update({
                            ...newData,
                            employeeImage: url,
                            employeeImageName: newData.employeeImage.name,
                            timestamp: oldData.timestamp
                        }).then(() => {
                            storage.refFromURL(oldData.employeeImage).delete()
                            setIsLoading(false)
                            Swal.fire(
                                'Employee has been updated',
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





// TRANSACTIONS
export const addTransaction = (data) => {
    Swal.fire({
        title: 'Create history transaction?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#gray',
        confirmButtonText: 'Create now!'
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection('transactions').add({
                ...data,
                timestamp: timestamp()
            }).then(() => {
                Swal.fire(
                    'New history transaction has been created',
                    'success'
                )
            })
        }
    })
}
export const getTransactions = () => getData('transactions', handleTransactions)
export const deleteTransaction = (data) => deleteData('Transactions', data.id)






// MEMBERS
export const addMember = (data, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Adding new member?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Adding now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            db.collection('members').add({
                ...data,
                timestamp: timestamp()
            }).then(() => {
                setIsLoading(false)
                Swal.fire(
                    'New member has been added',
                    'success'
                )
                handleBack()
            }).catch(() => {
                setIsLoading(false)
            })
        }
    })
}
export const getMembers = () => getData('members', handleMembers)
export const editMember = (oldData, newData, setIsLoading, handleBack) => {
    Swal.fire({
        title: 'Update member?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
        confirmButtonText: 'update now!'
    }).then((result) => {
        if (result.isConfirmed) {
            setIsLoading(true)
            db.collection('members').doc(oldData.id).update({
                ...newData,
                timestamp: oldData.timestamp
            }).then(() => {
                setIsLoading(false)
                Swal.fire(
                    'Member has been updated',
                    'success'
                )
                handleBack()
            }).catch(() => {
                setIsLoading(false)
            })
        }
    })
}
export const deleteMember = (data) => deleteData('Members', data.id)


export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

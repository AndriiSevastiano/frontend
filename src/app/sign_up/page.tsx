"use client"
import Image from 'next/image'
import MyInput from '@/components/Input';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Modal from '@/components/Modal';
import { gql , useMutation } from '@apollo/client';
import client from "../../apollo-client"
import { ApolloError } from '@apollo/client/errors';
import { type } from 'os';
export default function Home() {
    type CreateUser = {
        name: string,
        surname: string,
        email: string,
        password: string,
        phoneNumber: string,
        confirmPassword: string,
        submit:boolean
    }
   type ModalInfo = {
  title: string,
  description: string,
}
    const [user, setUser] = useState<CreateUser>({ name: "", email: "", password: "", phoneNumber: "", surname: "", confirmPassword: "",submit:false })
    const [modalInfo, SetModalInfo] = useState<ModalInfo>({ title: 'server error', description: "Internal server error"})
    function register() {
        if (user.password != user.confirmPassword) { return 'password and confirmed password not match' }
        if (user.submit === false) { return 'Accept the Terms and Conditions' }
        // for (let prop in user){
        //     if (user.hasOwnProperty(prop)) {
        //         if (prop.length == 0) {
        //             return `${prop} should not be empty`
        //         }
        //     }
        // }
        return false;
    }

    let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    }
    
    const Create_User_GQL = gql`
    mutation Mutation($name: String!, $surname: String!, $email: String!, $password: String!, $phoneNumber: String!) {
  CreateUser(name: $name, surname: $surname, email: $email, password: $password, phone_number: $phoneNumber) {
    id
    name
    surname
    phone_number
    email
    password
    Role
    Avatar
    CreatedAt
    UpdatedAt}
    }   
    `
    async function GQL_SEND() {
        try {
            const resultl = await client.mutate({ mutation: Create_User_GQL, variables: { ...user } })
            if (resultl.data) {
                SetModalInfo({ title: "Success", description: `${resultl.data.name} thank you for register 😊` })
                openModal()
            }
        }
        catch (e) {
            if (e instanceof ApolloError) {
                SetModalInfo({title: e.name , description:e.message})
                openModal()
            }
        }
        
    }
  return (
      <section className="bg-gray-50 dark:bg-gray-900 pt-10">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://toppng.com/uploads/preview/burger-svg-icon-free-burger-icon-11553410767qjmzrectv3.png" alt="logo"/>
          Bumberg    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                              <MyInput placeholder='Your name' value={user.name} props={{ onchange: (value:string) => setUser({ ...user, name: value }) }} />
                  </div>
                  <div>
                      <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">surname</label>
                      <MyInput placeholder='Your surname' value={user.surname}  props={{ onchange: (value:string) => setUser({ ...user, surname: value }) }}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <MyInput placeholder='name@company.com' value={user.email}  props={{ onchange: (value:string) => setUser({ ...user, email: value }) }}/>
                  </div>
                  <div>
                      <label htmlFor="phone number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone number</label>
                      <MyInput placeholder='380(68)1234567' value={user.phoneNumber}  props={{ onchange: (value:string) => setUser({ ...user, phoneNumber: value }) }}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <MyInput placeholder='••••••••' value={user.password}  props={{ onchange: (value:string) => setUser({ ...user, password: value }) }}/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <MyInput placeholder='••••••••' value={user.confirmPassword}  props={{ onchange: (value:string) => setUser({ ...user, confirmPassword: value }) }}/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input onClick={()=>setUser({...user , submit:true})}  type="checkbox" className="w-4 h-4 border border-gray-600 rounded bg-gray-500 accent-blue-900" />
                      </div>
                      <div className="ml-3 text-sm">
                                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-800 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                          <button onClick={async (e) => {
                              e.preventDefault();
                              const Validation = register()
                              if (Validation) {
                                  SetModalInfo({ title: "Error", description: Validation });
                                  openModal()
                                  return
                              }
                              await GQL_SEND()

                          }} type="submit" className="w-full text-white bg-black hover:bg-gray-700 focus:ring-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-800 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
          </div>
          <Modal isOpen={isOpen} closeModal={closeModal} description={modalInfo.description} title={modalInfo.title} />
</section>
  )
}

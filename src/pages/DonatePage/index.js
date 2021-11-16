import React, { useEffect, useRef, useState } from 'react'
import { usePostContext } from '../../contexts/postContext';
import { useCharityContext } from '../../contexts/charityContext';
import { useAuthContext } from '../../contexts/auth';
import './DonatePage.css'

function DonatePage() {

    const paypal = useRef();

    const [donate, setDonate] = useState(100);
    const [ready, setReady] = useState(false);
    const { postId, emailP } = usePostContext()
    const { charityName, setCharityName, charityId } = useCharityContext()
    const { currentUser } = useAuthContext()

    useEffect(() => {
        if (ready == true) {
            console.log('email inside useeffect is ' + emailP)
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            application_context: {
                                shipping_preference: 'NO_SHIPPING'
                            },
                            purchase_units: [{
                                description: "Donating to Greenpeace Post1",
                                amount: {
                                    currency_code: "GBP",
                                    value: donate,
                                },
                                payee: {
                                    email_address: emailP
                                },
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log(order);
                        let orderData = {
                            user_name: emailP,
                            charity_name: charityName,
                            amount: donate,
                        }
                        const options = {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                "Access-Control-Allow-Origin": "*",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                            mode: 'cors',
                            body: JSON.stringify(orderData)
                        }
                        // const response = await fetch(`${charityId}/donate/${userId}`, options)
                        const response = await fetch(`http://127.0.0.1:5000/${charityId}/donate/${currentUser.sub.id}`, options)


                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(paypal.current);
        }
    }, [ready]);

    return (
        <div>
            <h1 className="donate-page-title">Donate</h1>
            <p>Please enter the amount you would like to donate:</p>
            <input type="text" onChange={(e) => { setDonate(parseInt(e.target.value)) }} />
            <button onClick={() => { setReady(true) }}>Confirm</button>

            <div className="paypal-container" ref={paypal}></div>
        </div>
    );

}

export default DonatePage

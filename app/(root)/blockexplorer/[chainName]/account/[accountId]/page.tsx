'use client';

import AuthContext from '@/context/auth-ctx';
import SessionKit, { APIClient, Name, Session } from '@wharfkit/session';

import { AccountKit } from '@wharfkit/account';
import { Chains } from '@wharfkit/common';

const page = async ({
    params,
}: {
    params: { chainName: string; accountId: string };
}) => {
    const ac = Name.from(params.accountId);
    const accountKit = new AccountKit(Chains.EOS);

    const account = await accountKit.load(params.accountId);
    //const res = account.resources();
    
    const balance = await account.balance("EOS");
       
    console.log('Balance Unit:', balance.units.toString());
    console.log('Balance Value :', balance.value.toLocaleString());


    const data = account.data;
    const permissions = data.permissions;
    permissions.forEach((perm) => {
        console.log('Permission: ', perm.perm_name.toString());
        perm.required_auth.keys.forEach(keyweight => {
          console.log("Key: ", keyweight.key.toString());
          console.log("Key Legacy: ", keyweight.key.toLegacyString());
          console.log("Key weight: ", keyweight.weight.toString());
        });
    });

    if (data.core_liquid_balance) {
        console.log("Core Liquid Balance: ",data.core_liquid_balance.toString());
    }
    console.log("cpu_limit.current_used: ",data.cpu_limit.current_used.toString())
    console.log("cpu_limit.last_usage_update_time: ",data.cpu_limit.last_usage_update_time.toString())
    console.log("cpu_limit.available: ",data.cpu_limit.available.toString())
    console.log("cpu_limit.max: ",data.cpu_limit.max.toString())
    console.log("cpu_limit.used: ",data.cpu_limit.used.toString())
    
    console.log("cpu_weight: ",data.cpu_weight.toString())
    console.log("net_weight: ",data.net_weight.toString())
    
    if(data.rex_info){
        console.log("REX: ",data.rex_info.rex_balance.toString())
    }
    

    return <div className='h-screen text-heading1-bold'>Account</div>;
};

export default page;

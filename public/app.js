
var contractABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// const loginbutton = document.getElementById('connect_to_metamask');



document.addEventListener('DOMContentLoaded', async () => {
    
    if (typeof window.ethereum !== 'undefined') {
        console.log("Metamask is installed!");


		window.onload = function() {
			var contractAddress = "0x5FbB17fa63C225e0347F8Eacd45b2A6b5FD076c1";

			const loginbutton = document.getElementById("connect_to_metamask");
			var web3 = new Web3(window.ethereum);
        	console.log("web3 is loaded", web3);

        	var myContract = new web3.eth.Contract(contractABI, contractAddress);
        	console.log("contract is loaded", myContract);
			loginbutton.addEventListener("click", function() {
			  
				var accounts =ethereum.request({method: 'eth_requestAccounts'});
				var address = accounts[2];
	
				// console.log(useraddress.innerText);
				var	useraddress = document.getElementById('accountaddress');
				
				useraddress.innerText = address;
	
				// console.log(useraddress.innerText);
				useraddress.classList.remove('d-none');
				loginbutton.classList.add('d-none');
				console.log(accounts);
				console.log(address);
				

				
			});

			ethereum.on('accountsChanged', async function (accounts) {
				var	useraddress = document.getElementById('accountaddress');
				var accounts = await ethereum.request({method: 'eth_requestAccounts'});
				address = accounts[0];
				useraddress.innerText = address;
			});
			var depositbutton = document.getElementById('depositbutton');
			var depositinput = document.getElementById('depositeth');

			depositbutton.addEventListener('click', () => {

				console.log(depositinput.value);
	
				myContract.methods.deposit().send({from: address, value:(depositinput.value) * (10**18)}, function (err,res) {
					console.log(res);
				});
			});
			var withdrawbutton = document.getElementById('withdrawbutton');
			var withdrawinput = document.getElementById('withdraweth');
	
			withdrawbutton.addEventListener('click', () => {
				var amount = withdrawinput.value * (10**18);
				console.log(amount)
				myContract.methods.withdraw(amount.toString()).send({from: address}, function(err,res) {
					console.log(res);
				});
	
			});

			var getbalancebutton = document.getElementById('getbalance');
			var balance = document.getElementById('balance');
			getbalancebutton.addEventListener('click', () => {
	
				myContract.methods.getBalance().call({from: address}, function(err,res) {
					console.log(res/(10**18));
					balance.innerText = res / (10**18);
				})
	
			})
		  }


        

       

    }

    else {
        alert('Please install Metamask!');
    }
});
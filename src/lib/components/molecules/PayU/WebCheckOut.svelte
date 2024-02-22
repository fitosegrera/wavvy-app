<script lang="ts">
	export let label = 'Pagar';
</script>

<form
	class="w-full"
	method="post"
	action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
	<input name="merchantId" type="hidden" value="508029" />
	<input name="accountId" type="hidden" value="512321" />
	<input name="description" type="hidden" value="Test PAYU" />
	<input name="referenceCode" type="hidden" value="TestPayU" />
	<input name="amount" type="hidden" value="20000" />
	<input name="tax" type="hidden" value="3193" />
	<input name="taxReturnBase" type="hidden" value="16806" />
	<input name="currency" type="hidden" value="COP" />
	<input name="signature" type="hidden" value="7ee7cf808ce6a39b17481c54f2c57acc" />
	<input name="test" type="hidden" value="0" />
	<input name="buyerEmail" type="hidden" value="test@test.com" />
	<input name="responseUrl" type="hidden" value="http://www.test.com/response" />
	<input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation" />
	<input
		class="bg-primary w-full text-on-primary px-[24px] rounded-md py-[12px] transition-all duration-300 hover:bg-primary-dark border-none disabled:bg-status-disabled/70"
		name="Submit"
		type="submit"
		value={label} />
</form>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, InfoCard, Text } from '$lib/components';
	// import 'leaflet/dist/leaflet.css';
	// import { Map, Marker, Popup, TileLayer } from 'svelte-map-leaflet';

	// const mapOptions = { center: [10.142801355424975, -75.70379579071006], zoom: 7 };
	// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	// const markerLatLng = [10.142801355424975, -75.70379579071006];
	// const popupMessage = 'Carey beach Baru Island, Cartagena, Colombia';
</script>

<FlexBox intent="flexColTop" class="w-full h-full" py="medium" gap="medium">
	<!-- <div class="map">
		{#if browser}
			<Map options={mapOptions}>
				<TileLayer url={tileUrl}></TileLayer>
				<Marker latLng={markerLatLng}>
					<Popup>{popupMessage}</Popup>
				</Marker>
			</Map>
		{/if}
	</div> -->
	<InfoCard title="Get Started" description="" />
	<Text intent="h6" class="max-w-[75%] text-center font-normal">
		Navega hacia tu nueva aventura con <span class="font-bold">Wavvy</span>
		, la forma más rápida y conveniente de disfrutar del paddle boarding.
	</Text>
	<Button intent="primary" fullWidth size="large" onClick={() => goto('/scanner')}>
		Alquila tu paddle!
	</Button>
</FlexBox>

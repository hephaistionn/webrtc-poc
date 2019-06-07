
<template>
  <div class='cgu-terms'>
    <div class='cgu-terms__container'>
      <button class='cgu-terms__container__close'  v-on:click='showHome'>Close</button>
      <h2>Conditions générales d'utilisation</h2>
      <h3>Description du service</h3>
      <p>Camroulette déclenche aléatoirement des discussions privées entre ses utilisateurs.</p>
      <p>Les deux utilisateurs mis en relation peuvent interagir via un chat textuel, audio et vidéo.</p>
      <p>Le canal de communication entre les utilisateurs est un réseau p2p.</p>
      <p>Camroulette n'est pas un service professionnel, mais un projet amateur.</p>
      <h3>Conditions d'utilisation</h3>
      <p>Pour utiliser ce service, vous devez :</p>
      <ul>
        <li>Vous devez Accepter les conditions d'utilisation</li>
        <li>Vous devez avoir l'age de la majorité dans la juridiction dans laquelle vous résidez</li>
        <li>Vous devez respecter votre interlocuteur</li>
        <li>Vous êtes responsable du contenu que vous produisez</li>
        <li>Vous devez accepter que le service n'est pas responsable du contenu produit par ses utilisateurs</li>
        <li>Vous devez accepter que le service altère ou censure votre username via une modération automatique</li>
      </ul>
      <h3>Protection des données</h3>
      <p>Ce service ne conserve aucune données personnelles.</p>
      <p>Ce site fourni une interface de mise en relation client à client via une technologie P2P.</p>
      <h3>EXCLUSION DE GARANTIES</h3>
      <p>Ce service est fourni en l'état, avec ses qualités et défauts.</p>
      <p>Ce service n'est pas responsable des conséquences de son utilisation.</p>
      <h3>Mentions légales</h3>
      <p>hébergement : kimsufi.com</p>
      <p>Ce site n'est pas un site professionnel.</p>
      <p>Le propriétaire n'est pas une entreprise.</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'cguterms',
  props: {},
  methods: mapActions(['showHome'])
};
</script>

<style lang='sass'>
    .cgu-terms {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: white;
      z-index: 1;
      &__container {
        position: relative;
        max-width: 800px;
        margin: auto;
        padding: 40px;
        p {
          margin: 0;
        }
        &__close {
          position: fixed;
          border: none;
          background: var(--color1);
          padding: 5px 18px;
          right: 1rem;
          top: 1rem;
        }
      }
    }
</style>



<template>
  <div class="hello">
    <div>
      <img src="../assets/kd-logo-dark.svg" class="logo"/>
    </div>
    <h1>This is Kindred.</h1>
    <div class="intro-outer">

      <p><strong>Blood, the most essential body fluid, is one of the most vital components of any health care system. Even though modern medicine has excelled rapidly over the years but has yet to discover a real substitute for blood or replace it with an artificially produced liquid. Thus, at present the only way to obtain blood for the smooth operation of any health care system is by collecting from donors.</strong></p>
      <p>By the year 2050 the number of individuals globally who are aged above 65 years will be tripled and rise up to 1.5 billion and represent a total of 16 per cent of the global population. By then this increase in the number of senior citizens will not only cause in a decline of the eligible blood donors but also result in a higher demand of blood needed.</p>
      <p>Though many people donate blood due to having altruistic personalities, peer pressure or for being awarded there are various reasons for the different organisations and authorities not being able to attract blood donors.</p>
      <p>Currently, in the United Kingdom alone, at least 400 new blood donors from different backgrounds are required daily to meet the demand adequately. According to the NHS Blood and Transplant department (NHSBT), only a total of 19 percent of the 18-24 age group surveyed had donated blood at least once and 35 percent of the surveyed age group answered that they were fearful from donating blood. In addition, the NHSBT survey also mentions that most of the people who donate blood are aged over 45 <a>https://www.blood.co.uk/why-give-blood/</a></p>
      <p><strong><router-link to="/register">Register an account to get started!</router-link></strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .intro-outer {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

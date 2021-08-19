<template>
    <footer>

        <div class="container__footer">
            <div class="box__footer">
                <div class="logo">
                   <img src="../assets/logo_uba.png" alt="">
                </div>
                <div class="terms">
                    <p>{{ $t("views.footer.terms") }} </p>
                </div>
            </div>

            <div class="box__footer">
                <h5>{{ $t("views.footer.navigation") }}</h5>
                <a href="#" class="footer-sub-link">{{ $t("views.components.navBar.menu.about") }}</a>
                <a href="#" class="footer-sub-link">{{ $t("views.components.navBar.menu.design") }}</a>
                <a href="#" class="footer-sub-link">{{ $t("views.components.navBar.menu.results") }}</a>
                <a href="#" class="footer-sub-link">{{ $t("views.components.navBar.menu.contact") }}</a>
            </div>

            <div class="box__footer">
                <h5>{{ $t("views.footer.usefulLinks") }}</h5>
                <a href="http://www.laboratoriofisiologiaproteinas.tk/" class="footer-sub-link">Laboratorio de Proteínas</a>
                <a href="#" class="footer-sub-link">Procesos</a>
                <a href="#" class="footer-sub-link">Servicios</a>
            </div>

            <div class="box__footer">
                <h5>{{ $t("views.footer.contactInfo") }}</h5>
                <p class="footer-sub-link">Departamento de Química Biológica - IQUIBICEN </p>
                <p class="footer-sub-link">Facultad de Ciencias Exactas y Naturales </p>
                <a href="https://www.google.com/search?q=ciudad%20universitaria%20direccion&oq=ciudad+universitaria&aqs=chrome.1.69i57j0i512j46i175i199i512l2j0i457i512j0i512l3j46i175i199i512j0i512.6490j0j7&sourceid=chrome&ie=UTF-8&tbs=lf:1,lf_ui:2&tbm=lcl&sxsrf=ALeKk00kXEAMNV09HgxZ9TrfQ1-8HvUh8w:1629062357928&rflfq=1&num=10&rldimm=4925009595773625950&lqi=Ch5jaXVkYWQgdW5pdmVyc2l0YXJpYSBkaXJlY2Npb25I15Thn4iAgIAIWioQAhgAGAEiHmNpdWRhZCB1bml2ZXJzaXRhcmlhIGRpcmVjY2lvbioCCAKSARFwdWJsaWNfdW5pdmVyc2l0eaoBERABKg0iCWRpcmVjY2lvbigO&ved=2ahUKEwjY06SZ-rPyAhV6LLkGHRAhBaQQvS4wAHoECBAQMg&rlst=f#rlfi=hd:;si:4925009595773625950,l,Ch5jaXVkYWQgdW5pdmVyc2l0YXJpYSBkaXJlY2Npb25I15Thn4iAgIAIWioQAhgAGAEiHmNpdWRhZCB1bml2ZXJzaXRhcmlhIGRpcmVjY2lvbioCCAKSARFwdWJsaWNfdW5pdmVyc2l0eaoBERABKg0iCWRpcmVjY2lvbigO;mv:[[-34.54098279459013,-58.43563265978428],[-34.54799952606422,-58.45095343767735],null,[-34.544491234272996,-58.443293048730816],17]" class="footer-sub-link">Ciudad Universitaria, Pabellón II 4º Piso CP: C1428EGA</a>
            </div>

        </div>
    </footer>
</template>

<script>
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

    footer{
        width: 100%;
        background-size: cover;
        position: relative;
        background: #ffffff;
        -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
        -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.18);
        /*margin-bottom: 25px;*/
    }

    .container__footer{
        display: flex;
        z-index: 999;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: auto;
        margin-top: 100px;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    .box__footer{
        display: flex;
        flex-direction: column;
        padding: 15px 0px;

    }

    .box__footer .logo img{
        padding: 0px 20px;
        width: 350px;
    }

    .box__footer .terms{
        max-width: 350px;
        margin-top: 20px;
        font-weight: 500;
        color: #7a7a7a;
        font-size: 12px;
    }

    .box__footer h5{
        margin-bottom: 20px;
        color: #343434;
        font-weight: 700;
        text-align: left;
        font-family: "Roboto";
    }

    .box__footer a{
        margin-top: 10px;
        color: #7a7a7a;
        font-weight: 600;
    }

    .box__footer p{
        margin-top: 10px;
        color: #7a7a7a;
        font-weight: 600;
        border-bottom: #7a7a7a;
        -moz-border-bottom-colors: #7a7a7a;
    }

    .box__footer a:hover{
        opacity: 0.8;
    }


    .footer-sub-link {
        display: block;
        padding-top: 0;
        padding-bottom: 5px;
        border-bottom: 3px solid hsla(0, 100%, 48.8%, 0.07);
        -webkit-transition: color .4s;
        transition: color .4s;
        color: #dadfe9;
        font-size: 12px;
        line-height: 24px;
        font-weight: 400;
        text-decoration: none;
    }

</style>

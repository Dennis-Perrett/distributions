function range(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
  }

function logit(x){
    let x_l = []
    
    for (let i = 0; i < x.length; i++){
        x_l.push(1/(1+Math.exp(-x[i])))
    }
    return x_l
}

function beta(a,b){
    return (math.gamma(a)*math.gamma(b))/math.gamma(a+b)
}
function make_chart(x,y,id, type="line"){
  const labels = x;
  let fill_colour = 'rgba(0, 208, 208,.15)'

  

  const data = {
    labels: labels,
    datasets: [{
      
      backgroundColor: fill_colour,
      borderWidth: 2,
      borderColor: '#00D0D0',
      data: y,
      lineTension: .4,
      fill: 'origin',
    }]
  };

  const config = {
    type: type,
    data: data,
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false
            }
          },
        scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks:{
                  display: false,
              }
            },
            y: {
              grid: {
                display: false,
                drawBorder: false,
                },
                ticks:{
                    display: false,
                }
            },

        },
        elements: {
            point:{
                radius: 0
            }
        }, 
    }
  };

  const myChart = new Chart(
    document.getElementById(id),
    config
  );

  return myChart
}

function binomial_fn(n,k){
    return(Math.round(math.factorial(n)/(math.factorial(k) * math.factorial(n - k))))
}
/* Distribution functions */

function binomial_PDF(x,theta){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        //binom = (math.factorial(x.length)/(math.factorial(x[i]) * math.factorial(x.length - x[i])))
        y_i = binomial_fn(x.length,x[i]) * theta**x[i] * (1-theta)**(x.length-x[i])
        y.push(y_i)
    }
    return y
}

function poisson_PDF(lambda, x){
    let y = []
    let y_i = []

    for (i = 0; i < x.length; i++){
        y_i = lambda**x[i] / math.factorial(x[i]) * Math.exp(-lambda)
        y.push(y_i)
    }
    return y
}

function negbinom_PDF(r, prob, x){
    let y = [];

    for (let i = 0; i < x.length; i++){
        r = r * 1
        y_i = binomial_fn(r + x[i] - 1,r-1)*prob**r * (1-prob)**(x[i])   
        y.push(y_i)
    }
    return y
}

function betabinom_PDF(n,a,b,x){
    let y = [];
    let y_i = [];
    n = n*1
    a = a*1
    b = b*1
    for (let i = 0; i < x.length; i++){
        
        a_ = binomial_fn(n,x[i])
        b_ = beta(x[i] + a, n + b - x[i])
        c_ = beta(a,b)
        y_i = a_ * b_ / c_
        y.push(y_i)
    }
    return y
    
}

function norm_PDF(mu, sigma, x){
    /* Returns the PDF of a normal distribution */
    let y = []; // to store areas of circles
    let y_i = [];

    for (let i = 0; i < x.length; i++) {
        y_i= 1/(Math.sqrt(2*Math.PI*sigma**2)) * Math.exp( - ( (x[i] - mu)**2 / (2*sigma**2)) );
        y.push(y_i);
    }

    
return y}

function stt_PDF(mu, sigma,df, x){
    /* Returns the PDF of a normal distribution */
    let y = []; // to store areas of circles
    let y_i = [];

    for (let i = 0; i < x.length; i++) {

        let num = (df / (df+((x[i]-mu)**2/sigma**2 ) )**((df+1)/2))
        let den = (Math.sqrt(df) * sigma * (math.gamma(df/2) * math.gamma(1/2))/math.gamma(df/2 + 1/2))
        y_i = num/den;  
        y.push(y_i);
        
    }

return y}

function expo_PDF(r, x){
    /* Returns the PDF of a normal distribution */
    let y = []; // to store areas of circles
    let y_i = [];

    for (let i = 0; i < x.length; i++) {
        y_i= r * Math.exp(-r*x[i])
        y.push(y_i);
    }
    

return y}

function gamma_PDF(a, b, x){
    let y = [];
    let y_i = [];
    for (let i = 0; i < x.length; i++){
        y_i = b**a/math.gamma(a) * x[i] ** (a-1) * Math.exp(-b*x[i])
       y.push(y_i)
    }
    
    
    return y
}

function beta_PDF(a,b,x){
    let y = [];
    let y_i = [];
    
    for (let i = 0; i < x.length; i++){
        let num = x[i]**(a-1) * (1-x[i])**(b-1)
        let den = beta(a,b)
        y_i = num/den
        y.push(y_i)
    }
    
    return y
};

function logitnorm_PDF(mu, sigma, x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        y_i = 1/(Math.sqrt(2*Math.PI)*x[i]*(1-x[i]) * sigma) * Math.exp( -1 * (Math.log( x[i] / (1-x[i]) ) - mu)**2/(2*sigma**2))
        y.push(y_i)
    }
    
    return y
}

function cauchy_PDF(median, gamma,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        y_i = 1 / (Math.PI * gamma * (   (x[i] - median)**2 / (gamma**2) + 1) )
        y.push(y_i)
    }
    
    return y
    
}

function halfcauchy_PDF(a, b,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        if (x[i] <= 0){
            y.push(0)
        }else{
        y_i = 2 * b  / ( (b**2 + (x[i] - a)**2) * (2*Math.atan(a/b) + Math.PI)  *5000)
        y.push(y_i)
        }
    }
    
    return y
    
}

function invgamma_PDF(a, b,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        
        y_i = b**a / math.gamma(a) * x[i] ** (-a - 1) * Math.exp(-b/x[i])
        y.push(y_i)
        
    }
    
    return y
    
}

function invchi_PDF(df,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        
        y_i = 2**(-df/2) / math.gamma(df/2) * x[i]**(-df/2 - 1) * math.exp(-1/(2*x[i]))
        y.push(y_i)
        
    }

    return y
    
}

function lognorm_PDF(mu, sigma,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        
        y_i =  y_i= 1/(Math.sqrt(2*Math.PI*sigma**2)*x[i]) * Math.exp( - ( (Math.log(x[i]) - mu)**2 / (2*sigma**2)) );
        y.push(y_i)
        
    }
    
    return y
    
}

function LKJ_PDF(eta,x){
    let y = [];
    let y_i = [];

    for (let i = 0; i < x.length; i++){
        matrix = [[1,x[i]],[x[i],1]]
        y_i = math.det(matrix) ** (eta-1)
        y.push(y_i)
        
    }
    return y
    
}

function wish_PDF(df,x){
    let y = [];
    let y_i = [];

    let scale_matrix = [[1,0],[0,1]]
    d = scale_matrix[0].length
    for (let i = 0; i < x.length; i++){
        matrix = [[1,x[i]],[x[i],1]]
        y_i =  math.det(matrix)**((df-d-1)/2) * Math.exp(-math.trace( math.multiply(math.inv(scale_matrix),matrix))/2)/ (2**((df*d)/2) * math.det(scale_matrix)**(df/2) * math.gamma(df/2)    )
        y.push(y_i)
        
    }
    console.log(y)
    return y
    
}
// need to implement
function invwish_PDF(df,x){
    let y = [];
    let y_i = [];

    let scale_matrix = [[1,0],[0,1]]
    d = scale_matrix[0].length
    for (let i = 0; i < x.length; i++){
        matrix = [[1,x[i]],[x[i],1]]
        y_i =  math.det(scale_matrix)**(df/2)* math.det(matrix)**((df-d-1)/2) * Math.exp(-math.trace( math.multiply(math.inv(scale_matrix),matrix))/2)/ (2**((df*d)/2)  * math.gamma(df/2)    )
        y.push(y_i)
        
    }
    console.log(y)
    return y
}


/* Chart updater(s) */

function addData(chart, data) {
    
    chart.data.datasets[0].data = data;
    chart.update();
}

function update_bern_dist(){
    prop = document.getElementById("berndist_prob").value
    x = [0,.5, 1]
    y = [(1-prop),0,prop]

    addData(bern_dist_PDF,y)
}

function update_binom_dist(){
    prop = document.getElementById("berndist_prob").value
    x = range(0,20,50)
    y = binomial_PDF(x, document.getElementById("binomdist_prob").value)

    addData(binomial_dist_PDF,y)
}

function update_poisson_dist(){
    x = range(0,20,50)
    y = poisson_PDF(document.getElementById("possion_rate").value, x)

    addData(poisson_dist_PDF, y)
}

function update_negbinom_dist(){
    x = range(0,100,101)
    r = document.getElementById("negbinom_rate").value
    prop = document.getElementById("negbinom_theta").value
    
    y = negbinom_PDF(r,prop,x)

    addData(negbinom_dist_PDF,y)
}

function update_betabinom_dist(){
    n = document.getElementById("betabinom_n").value * 1
    a = document.getElementById("betabinom_a").value * 1
    b = document.getElementById("betabinom_b").value * 1
    x = range(0,n,n+1)
    y = betabinom_PDF(n,a,b,x)

    addData(betabinomial_dist_PDF,y)
}

function update_norm_dist(){
    let mu = 0
    x = range(-50,50,100)
    y = norm_PDF(document.getElementById("normdist_mean").value, document.getElementById("normdist_sigma").value, x)
    
    addData(norm_dist_PDF, y)
}

function update_stt_dist(){
    
    df = document.getElementById("stt_df").value
    lim = 30/df
    x = range(-lim,lim,100)
    y = stt_PDF(document.getElementById("stt_mean").value,document.getElementById("stt_var").value,df, x)
    
    addData(stt_dist_PDF, y)
}


function update_expo_dist(r){
    x = range(0,5,100)
    y = expo_PDF(r,x)
    addData(expo_dist_PDF,y)
}

function update_gamma_dist(){
    x = range(0,5,100)
    y = gamma_PDF(document.getElementById("gamma_a").value,document.getElementById("gamma_b").value,x)
    addData(gamma_dist_PDF,y)

}

function update_beta_dist(){
    x = range(0,1,100)
    y = beta_PDF(document.getElementById("betadist_a").value,document.getElementById("betadist_b").value,x)
    addData(beta_dist_PDF,y)
}

function update_logitnorm_dist(){
    x = range(0,1,100)
    y = logitnorm_PDF(document.getElementById("logitnormdist_mean").value,document.getElementById("logitnormdist_variance").value,x)
    addData(logit_normal_PDF,y)
}


function update_cauchy_dist(){
    x = range(-20,20,100)
    y = cauchy_PDF(document.getElementById("cauchy_med").value,document.getElementById("cauchy_gamma").value,x)
    addData(cauchy_dist_PDF,y)
}

function update_halfcauchy_dist(){
    x = range(-10,20,100)
    y = halfcauchy_PDF(document.getElementById("halfcauchy_a").value,document.getElementById("halfcauchy_b").value,x)
    addData(halfcauchy_dist_PDF,y)
}

function update_invgamma_dist(){
    x = range(0.25,20,100)
    y = invgamma_PDF(document.getElementById("invgamma_a").value,document.getElementById("invgamma_b").value,x)
    addData(invgamma_dist_PDF,y)
}

function update_invchi_dist(){
    x = range(0,1,100)
    y = invchi_PDF(document.getElementById("invchi_df").value,x)
    addData(invchi_dist_PDF,y)
}

function update_lognorm_dist(){
    x = range(0,20,100)
    y = lognorm_PDF(document.getElementById("lognorm_a").value,document.getElementById("lognorm_b").value,x)
    addData(lognorm_dist_PDF,y)
}

function update_LKJ_dist(){
    x = range(-1,1,100)
    y = LKJ_PDF(document.getElementById("LKJ_eta").value,x)
    addData(LKJ_dist_PDF,y)
}

function update_wish_dist(){
    x = range(-1,1,100)
    y = wish_PDF(document.getElementById("wish_df").value,x)
    addData(wish_dist_PDF,y)
}

// Need to implement
function update_invwish_dist(){
    x = range(-1,1,100)
    y = invwish_PDF(document.getElementById("invwish_df").value,x)
    addData(invwish_dist_PDF,y)
}
/* Chart creators */

// Bernoulli distribution
x = [0,.5, 1]
y = [.75,0,.25]
var bern_dist_PDF = make_chart(x,y,"berndist", type="bar")


// Binomial distribution
x = range(0,20,50)
y = binomial_PDF(x, document.getElementById("binomdist_prob").value)
var binomial_dist_PDF = make_chart(x,y,"binomdist", type="bar")

// Poisson distribution
x = range(0,20,50)
y = poisson_PDF(.5, x)
var poisson_dist_PDF = make_chart(x,y,"poissondist", type="bar")

// Negative Binonmial
x = range(0,100,101)
r = document.getElementById("negbinom_rate").value
prop = document.getElementById("negbinom_theta").value
y = negbinom_PDF(r,prop,x)
var negbinom_dist_PDF = make_chart(x,y,"negbinomdist",type="bar")

// Beta Binomial
n = document.getElementById("betabinom_n").value * 1
a = document.getElementById("betabinom_a").value * 1
b = document.getElementById("betabinom_b").value * 1
x = range(0,n,n+1)
y = betabinom_PDF(n,a,b,x)
var betabinomial_dist_PDF = make_chart(x,y,"betabinomdist", type="bar")

// Normal distribution
x = range(-50,50,100)
y = norm_PDF(document.getElementById("normdist_mean").value, document.getElementById("normdist_sigma").value, x)
var norm_dist_PDF = make_chart(x,y,"normdist")

// Students-t
df = document.getElementById("stt_df").value
x = range(-30/df,30/df,100)
y = stt_PDF(document.getElementById("stt_mean").value,document.getElementById("stt_var").value,document.getElementById("stt_df").value, x)
var stt_dist_PDF = make_chart(x,y,"sttdist")

// Exponential
x = range(0,5,100)
y = expo_PDF(document.getElementById("exp_rate").value,x)
var expo_dist_PDF = make_chart(x,y,"expodist")

// Gamma
x = range(0,5,100)
y = gamma_PDF(document.getElementById("gamma_a").value,document.getElementById("gamma_b").value,x)
var gamma_dist_PDF = make_chart(x,y,"gammadist")

// Uniform
x = range(0,5,100)
y = range(5,5,100)
var uniform_dist_PDF = make_chart(x,y,"uniformdist")

// Beta
x = range(0,1,100)
y = beta_PDF(document.getElementById("betadist_a").value,document.getElementById("betadist_b").value,x)
var beta_dist_PDF = make_chart(x,y,"betadist")

// Logit-Normal
x = range(0,1,100)
x = logit(x)
y = logitnorm_PDF(document.getElementById("logitnormdist_mean").value,document.getElementById("logitnormdist_variance").value,x)
var logit_normal_PDF = make_chart(x,y,"logitnormdist")

// Cauchy
x = range(-20,20,100)
y = cauchy_PDF(document.getElementById("cauchy_med").value,document.getElementById("cauchy_gamma").value,x)
var cauchy_dist_PDF = make_chart(x,y,"cauchydist")

// Half-Cauchy
x = range(-10,20,100)
y = halfcauchy_PDF(document.getElementById("halfcauchy_a").value,document.getElementById("halfcauchy_b").value,x)
var halfcauchy_dist_PDF = make_chart(x,y,"halfcauchydist")

// Inverse-Gamma
x = range(0.25,20,100)
y = invgamma_PDF(document.getElementById("invgamma_a").value,document.getElementById("invgamma_b").value,x)
var invgamma_dist_PDF = make_chart(x,y,"invgammadist")

// Inverse-Chi2
x = range(0.25,20,100)
y = invchi_PDF(document.getElementById("invchi_df").value,x)
var invchi_dist_PDF = make_chart(x,y,"invchidist")

// Lognormal
x = range(0,20,100)
y = lognorm_PDF(document.getElementById("lognorm_a").value,document.getElementById("lognorm_b").value,x)
var lognorm_dist_PDF = make_chart(x,y,"lognormdist")

// LKJ
x = range(-1,1,100)
y = LKJ_PDF(document.getElementById("LKJ_eta").value,x)
var LKJ_dist_PDF = make_chart(x,y,"LKJdist")

// Wishart
x = range(-1,1,100)
y = wish_PDF(document.getElementById("wish_df").value,x)
var wish_dist_PDF =  make_chart(x,y,"wishdist")

//Inverse-Wishart
x = range(-1,1,100)
y = invwish_PDF(document.getElementById("invwish_df").value,x)
var invwish_dist_PDF =  make_chart(x,y,"invwishdist")
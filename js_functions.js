var selected_tags = []

function select_tag(tag_class){
    if (selected_tags.includes(tag_class)){
        selected_tags.splice(selected_tags.indexOf(tag_class),1)
    }else{
        selected_tags.push(tag_class)
    }
    set_opacities()

}

function set_opacities(){
    // get all elemnents that are tags and set opacity to 0.5
    set_opacity_all(0.5,0.5)
    
    console.log(selected_tags)
    // set opacities of selected tag elements
    for (var i = 0, max = selected_tags.length; i < max; i++) {
        
        tagElements = document.getElementsByClassName(selected_tags[i])
        console.log(tagElements[i])

        for (var j = 0, max = tagElements.length; j < max; j++) {
            
            tagElements[j].style.opacity = 1
            fourth_parent = tagElements[j].parentNode.parentNode.parentNode.parentNode
        
            if (fourth_parent.className.includes('card')){
                fourth_parent.style.opacity = 1
            }
        }
    }
    if (selected_tags.length == 0){
        set_opacity_all(0.5,1)
    }
    
}

function set_opacity_all(opacity_tag, opacity_card){
    // Sets opacity of all cards and tag elements

    all_tags = document.getElementsByClassName('tag')
    for (var k = 0, max = all_tags.length; k < max; k++) {
        all_tags[k].style.opacity = opacity_tag
        fourth_parent = all_tags[k].parentNode.parentNode.parentNode.parentNode
        
        if (fourth_parent.className.includes('card')){
            fourth_parent.style.opacity = opacity_card
        }
    }
}


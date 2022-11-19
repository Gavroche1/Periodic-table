const periodicTableElement = document.getElementById('periodicTable')
const listCategoriesElement = document.getElementById('listCategories')
const modalAtomElement = document.getElementById('modalAtom')
const modalAtomTitleElement = document.querySelector('#modalAtom h2')
const modalAtomNumberElement = document.querySelector("#modalAtom [data-text='number']")
const modalAtomsSymbolElement = document.querySelector("#modalAtom [data-text='symbol']")
const modalAtomCategoryElement = document.querySelector("#modalAtom [data-text='category']")
const modalAtomAtomicMassElement = document.querySelector("#modalAtom [data-text='atomic_mass']")
const modalAtomSourceElement = document.querySelector("#modalAtom [data-text='source']")
const modalAtomElectronConfigurationElement = document.querySelector("#modalAtom [data-text='electron_configuration_semantic']")
const modalAtomElectronegativityElement = document.querySelector("#modalAtom [data-text='electronegativity_pauling']")

function displayPeriodicTable () {
  for (const atomData of periodicTableData) {
    const atom = document.createElement('div')
    const atomName = document.createElement('span')
    const atomSymbol = document.createElement('span')
    const atomNumber = document.createElement('span')

    atom.style.gridColumn = atomData.xpos + ' / span 1'
    atom.style.gridRow = atomData.ypos + '  / span 1'
    atom.style.borderBottomColor = dictCategoriesColors[atomData.category]
    atom.setAttribute('category', atomData.category)
    atom.setAttribute('symbol', atomData.symbol)
    atom.addEventListener('click', clickAtom)

    atom.className = 'atom atom-hover'
    atomName.className = 'atom-name'
    atomSymbol.className = 'atom-symbol'
    atomNumber.className = 'atom-number'

    atomName.textContent = atomData.name
    atomSymbol.textContent = atomData.symbol
    atomNumber.textContent = atomData.number

    atom.appendChild(atomSymbol)
    atom.appendChild(atomName)
    atom.appendChild(atomNumber)
    periodicTableElement.appendChild(atom)
  }

  for (const placeholderData of periodicTablePlaceholders) {
    const placeholder = document.createElement('div')
    const placeholderName = document.createElement('span')
    const placeholderSymbol = document.createElement('span')

    placeholder.style.gridColumn = placeholderData.xpos + ' / span 1'
    placeholder.style.gridRow = placeholderData.ypos + '  / span 1'
    placeholder.style.borderBottomColor = dictCategoriesColors[placeholderData.category]
    placeholder.setAttribute('category', placeholderData.category)

    placeholder.className = 'atom atom-hover atom-placeholder'
    placeholderName.className = 'atom-name'
    placeholderSymbol.className = 'atom-symbol'

    placeholderName.textContent = placeholderData.name
    placeholderSymbol.textContent = placeholderData.symbol

    placeholder.appendChild(placeholderSymbol)
    placeholder.appendChild(placeholderName)
    periodicTableElement.appendChild(placeholder)
  }
}

function displayCategories () {
  for (const [category, color] of Object.entries(dictCategoriesColors)) {
    const textCategory = document.createElement('span')

    textCategory.textContent = category
    textCategory.style.color = color
    textCategory.addEventListener('click', clickCategory)

    listCategoriesElement.append(textCategory)
  }
}

function clickAtom (event) {
  const symbol = event.currentTarget.getAttribute('symbol')
  let atom = null

  // Find the atom in the list
  for (const atomData of periodicTableData) {
    if (atomData.symbol == symbol) {
      atom = atomData
    }
  }

  // Change the content
  modalAtomTitleElement.textContent = atom.name
  modalAtomNumberElement.textContent = atom.number
  modalAtomsSymbolElement.textContent = atom.symbol
  modalAtomCategoryElement.textContent = atom.category
  modalAtomAtomicMassElement.textContent = atom.atomic_mass
  modalAtomSourceElement.href = atom.source
  modalAtomElectronConfigurationElement.textContent = atom.electron_configuration_semantic
  modalAtomElectronegativityElement.textContent = atom.electronegativity_pauling

  // Display the specificities of the atom
  modalAtomElement.style.transform = 'translateY(0%)'

  event.stopPropagation() // The function clickBody is not triggered
}

function hidModalAtom () {
  modalAtomElement.style.transform = 'translateY(-200%)'
}

function clickCategory (event) {
  const category = event.target.textContent
  const atomElements = document.querySelectorAll('.atom')

  for (const atom of atomElements) {
    if (atom.getAttribute('category') != category) {
      atom.style.opacity = 0.3
      atom.classList.remove('atom-hover')
    } else {
      atom.style.opacity = 1
      atom.classList.add('atom-hover')
    }
  }

  event.stopPropagation() // The function clickBody is not triggered
}

function clickBody () {
  // Remove opacity
  const atomElements = document.querySelectorAll('.atom')

  for (const atom of atomElements) {
    atom.style.opacity = 1
    atom.classList.add('atom-hover')
  }

  hidModalAtom()
}

displayCategories()
displayPeriodicTable()

document.body.addEventListener('click', clickBody)
modalAtomElement.addEventListener('click', hidModalAtom)
